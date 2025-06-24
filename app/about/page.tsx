import React from 'react'
import Navbar from '../components/Navbar'

export default function About() {
  return (
    <div className="min-h-screen bg-[#EFD5AD] text-[#171717]">
      <Navbar />
      <div className="container mx-auto p-8">
        <h1 className="text-5xl font-bold font-['Iowan_Old_Style'] text-center mb-8">
          About Mylestography
        </h1>
        <p className="text-xl leading-relaxed mb-6">
          Welcome to Mylestography, where we turn moments into timeless art. Our passion
          is capturing the beauty of life and transforming it into striking visual stories.
        </p>
        <p className="text-xl leading-relaxed mb-6">
          Founded by a team of dedicated photographers and creatives, we blend modern techniques
          with classic aesthetics to deliver an experience that resonates with originality and depth.
        </p>
        <p className="text-xl leading-relaxed">
          Whether it's portrait sessions, breathtaking landscapes, or dynamic events, we
          work with you to create images that speak volumes. Thank you for choosing us to capture
          your precious moments.
        </p>
      </div>
    </div>
  )
}
