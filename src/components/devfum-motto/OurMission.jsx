import React from 'react'

const OurMission = () => {
  return (
    <div className='flex justify-center relative'>
    <div className='flex flex-col gap-4 text-center md:max-w-[70%] w-full overflow-hidden'>
      <h1 className="text-3xl font-bold text-center text-gradient-2 z-20">
        Our Mission
      </h1> 
      <div className='relative p-10'>
      <span className='absolute top-4 left-1 text-gradient text-[4rem]'>❝</span>
      <span className='text-primary-foreground leading-[1.75]'>At Devfum, we challenge the status quo by merging cutting-edge AI, XR, and web technologies with top talent to solve critical inefficiencies, drive innovation, and accelerate business growth. We go beyond building products—we cultivate a future-focused tech ecosystem, empowering businesses to lead, scale, and redefine industries</span>
      <span className='absolute bottom-[-0.9rem] md:bottom-[-1rem] md:right-[15rem] text-gradient text-[4rem]'>❞</span>
      </div>
    </div>
    </div>
  )
}

export default OurMission