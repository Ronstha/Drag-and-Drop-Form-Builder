"use client"
import { cn } from "@/lib/utils";
import DesignerSidebar from "./DesignerSidebar";
import { DragEndEvent, useDndMonitor, useDraggable, useDroppable } from '@dnd-kit/core'
import { useEffect, useState } from "react";
import { ElementsType, FormElementInstance, FormElements } from "./FormElements";
import useDesigner from "./hooks/useDesigner";
import { idGenerator } from "@/lib/id-generator";
import { Button } from "./ui/button";
import { BiSolidTrash } from "react-icons/bi";
const Designer = () => {
    const { elements, addElement,setSelectedElement,selectedElement,removeElement} = useDesigner()
    const droppable = useDroppable({
        id: "designer-drop-area", data: {
            isDesignerDropArea: true,
        }
    })
    useDndMonitor({
        onDragEnd: (event: DragEndEvent) => {
            const { active, over } = event;
            if (!active || !over) return;
            const isDesignerBtnElement = active?.data?.current?.isDesignerBtnElement;
            const isDroppingOverDesignerDropArea=over.data.current?.isDesignerDropArea
            
            //over Drop Area
            if (isDesignerBtnElement && isDroppingOverDesignerDropArea) {
                const type = active.data?.current?.type;
                const newElement = FormElements[type as ElementsType].construct(idGenerator())
                addElement(elements.length, newElement)
                return
            }
            const overTopHalf=over?.data?.current?.isTopHalfDesignerElement
            const overBottomHalf=over?.data?.current?.isBottomHalfDesignerElement
            const overDesingerElement=(overTopHalf|overBottomHalf)
            const overId=over.data?.current?.elementId
            //Dropping Sidebar btn over Designer Area
            const btnOverDesignerElement=isDesignerBtnElement && overDesingerElement
            if(btnOverDesignerElement){
                const type = active.data?.current?.type;
                const newElement = FormElements[type as ElementsType].construct(idGenerator())
                const overElementIndex=elements.findIndex((el)=>el.id===overId)
                if(overElementIndex==-1) throw new Error("element not found");
                let index=overElementIndex;
                if(overBottomHalf){
                    index+=1;
                }
                addElement(index, newElement)
                return
            }
            //Third Scenario
            const isDragggingDesignerElement=active.data?.current?.isDesignerElement
            if(overDesingerElement && isDragggingDesignerElement){
                const activeId=active.data.current?.elementId
                const overId=over.data.current?.elementId
                const activeElementIndex=elements.findIndex(el=>el.id===activeId)
                const overElementIndex=elements.findIndex(el=>el.id===overId)
                if(activeElementIndex===-1|| overElementIndex===-1) throw new Error('element not found')
                const activeElement={...elements[activeElementIndex]}
                removeElement(activeId)
                let index=overElementIndex;
                if(overBottomHalf){
                    index+=1;
                }
                addElement(index,activeElement)

            }
        }
    })
    return <div className="flex w-full h-full">
        <div className="p-4 w-full" onClick={(e)=>{
            if(selectedElement){
                e.stopPropagation();
                setSelectedElement(null);
            }
        }}>
            <div ref={droppable.setNodeRef}
                className={cn("bg-background max-w-[920px] h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto", droppable.isOver && "ring-2 ring-primary/20")}>
                {
                    (!droppable.isOver && elements.length == 0) &&
                    <p className="text-3xl text-muted-foreground flex flex-grow font-bold items-center">Drop here</p>
                }
                {
                    (droppable.isOver && elements.length==0) &&
                    <div className="p-4 w-full">
                        <div className="h-[120px] rounded-md bg-primary/20">

                        </div>

                    </div>
                }
                {
                    elements.length > 0 && (
                        <div className="flex flex-col  w-full gap-2 p-4">
                            {
                                elements.map(element => (
                                    <DesignerElementWrapper key={element.id} element={element} />
                                ))
                            }

                        </div>
                    )
                }
            </div>

        </div>
        <DesignerSidebar />
    </div>

}
export default Designer;


function DesignerElementWrapper({ element }: { element: FormElementInstance }) {
    const {removeElement,setSelectedElement}=useDesigner()
    const [mouseIsOver, setMouseIsOver] = useState<boolean>(false)
    const topHalf = useDroppable({
        id: element.id + "-top",
        data: {

            type: element.type,
            elementId: element.id,
            isTopHalfDesignerElement: true,
        },
    })
    const bottomHalf = useDroppable({
        id: element.id + "-bottom",
        data: {

            type: element.type,
            elementId: element.id,
            isBottomHalfDesignerElement: true,
        },
    })
    const draggable=useDraggable({id:element.id+'-drag-handler',data:{
        type:element.type,
        elementId:element.id,
        isDesignerElement:true
    }})
    useEffect(()=>{
        setMouseIsOver(false)
    },[draggable.isDragging])
    if(draggable.isDragging) return null;
    const DesingerElement = FormElements[element.type].designerComponent;
    return <div  ref={draggable.setNodeRef} {...draggable.listeners} {...draggable.attributes}
    className="relative h-[120px] flex flex-col text-foreground hover:cursor-pointer rounded-md ring-1 ring-accent ring-inset" onMouseEnter={()=>setMouseIsOver(true)}
    onMouseLeave={()=>setMouseIsOver(false)}
    onClick={(e)=>{
        e.stopPropagation();setSelectedElement(element)}}
    >
        <div ref={topHalf.setNodeRef} className={"absolute w-full h-1/2 rounded-t-md"}></div>
        <div ref={bottomHalf.setNodeRef} className="absolute w-full h-1/2 rounded-b-md bottom-0"></div>
        {
            mouseIsOver &&
             (
                <>
                <div className="absolute right-0 h-full">
                    <Button className="flex justify-center h-full border rounded-md rounded-l-none bg-red-500"
                    onClick={(e)=>{e.stopPropagation();removeElement(element.id)}}
                    ><BiSolidTrash className="w-6 h-6"/></Button>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse">
                    <p className="text-muted-foreground text-sm">Click for properties or drag to move</p> 
                </div>
                </>
            )
        }
        {
            topHalf.isOver && <div className="absolute top-0 w-full rounded-md h-[7px] bg-primary rounded-b-none"></div>
        }
        {
            bottomHalf.isOver && <div className="absolute bottom-0 w-full rounded-md h-[7px] bg-primary rounded-t-none"></div>
        }
        <div className={cn("relative flex w-full h-[120px] items-center rounded-md bg-accent/40 px-4 py-2 pointer-events-none opacity-100",mouseIsOver && "opacity-30")}>
            <DesingerElement elementInstance={element} />
        </div>
    </div>

}