"use server"
import { prisma } from '@/lib/prisma'
import { formSchema, formSchemaType } from '@/schemas/form'
import { auth } from '@clerk/nextjs/server'

class UserNotFoundErr extends Error { }


export async function GetFromStats() {
    const { userId } = await auth()
    if (!userId) throw new UserNotFoundErr()
    const stats = await prisma.form.aggregate({
        where: {
            userId
        },
        _sum: {
            visits: true,
            submissons: true
        }
    })

    const visits = stats._sum.visits || 0;
    const submissons = stats._sum.submissons || 0;

    let submissonRate = 0;
    if (submissonRate > 0) {
        submissonRate = (submissons / visits) * 100;

    }
    const bounceRate = 100 - submissonRate
    return { visits, submissonRate, bounceRate, submissons }

}


export const createForm = async (data: formSchemaType) => {
    const validation = formSchema.safeParse(data);
    if (!validation.success) {
        throw new Error("invalid form")
    }
    const { userId } = await auth()
    if (!userId) throw new UserNotFoundErr()
    const form = await prisma.form.create({
        data: {
            name: data.name,
            description: data.description,
            userId
        }
    })
    if (!form) throw new Error("Something Went Wrong ")
    return form.id
}

export const getForms = async () => {
    const { userId } = await auth()
    if (!userId) throw new UserNotFoundErr()
    return await prisma.form.findMany({
        where: { userId }, orderBy: {
            createdAt: 'desc'
        }
    })
}

export async function GetFormById(id:number){
    const { userId } = await auth()
    if (!userId) throw new UserNotFoundErr()
    return await prisma.form.findFirst({where:{
        userId,
        id
    }})
}
export async function updateFromContent(id:number,jsonContent:string){
    const { userId } = await auth()
    if (!userId) throw new UserNotFoundErr()
    return await prisma.form.update({
where:{
    userId,
    id
},
data:{
    content:jsonContent
}})
}

export async function PublishForm(id:number){
    const { userId } = await auth()
    if (!userId) throw new UserNotFoundErr()
    return await prisma.form.update({
where:{
    userId,
    id,
    published:false
},
data:{
    published:true
}})
}

export async function GetFormContentByUrl(formUrl:string){
    return await prisma.form.update({
        select:{
            content:true
        },
        where:{
            shareUrl:formUrl
        },
        data:{
            visits:{
                increment:1
        }

        }
    })
}

export async function SubmitForm(formUrl:string,content:string){
    return prisma.form.update({
        where:{
            shareUrl:formUrl,
            published:true
        },  
        data:{
            submissons:{
                increment:1
            },
            forms:{
                create:{
                    content
                }
            }
        }
    })

}


export async function GetFormWithSubmissons(id:number){
     const { userId } = await auth()
    if (!userId) throw new UserNotFoundErr()
        return await prisma.form.findUnique({
    where:{id},include:{forms:true}})
}