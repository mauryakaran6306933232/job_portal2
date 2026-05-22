import React from 'react'
import { Button } from './ui/button'
import {Carousel ,CarouselContent ,CarouselItem, CarouselNext, CarouselPrevious} from './ui/carousel'
const category=[
    "Frontent Developer" , "Backend Developer",
    "Data Science" , "Graphic Designer" , "FullStack Developer"
]
export default function CategoryCarousel() {
  return (
    <div>
        <Carousel className="w-full max-w-xl mx-auto my-20">
           <CarouselContent>
       {
         category.map((cat , index)=>(
            <CarouselItem className="md:basis-1/2 lg:basis-1/3">
            <Button variant="outline" className='rounded-full'>{cat}</Button>
            </CarouselItem>
         )
            
          
                
       )
         
       }

            <CarouselItem>

            </CarouselItem>
            </CarouselContent>  
            <CarouselPrevious/>
            <CarouselNext/>
        </Carousel>
    </div>
  )
}
