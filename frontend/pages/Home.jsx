import React from 'react'
import Hero from '../src/components/Hero'
import LatestCollection from '../src/components/LatestCollection'
import BestSeller from '../src/components/BestSeller'
import OurPolicy from '../src/components/OurPolicy'
import NewsLetterBox from '../src/components/NewsLetterBox'

const Home = () => {
  return (
    <div><Hero/>
    <LatestCollection/>
    <BestSeller/>
    <OurPolicy/>
    <NewsLetterBox/>
    </div>
  )
}

export default Home