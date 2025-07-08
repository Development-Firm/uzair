const Home = dynamic(() => import('@/sections/Home'), {
  ssr: false
})
import dynamic from 'next/dynamic'

export default function Page() {
  return (
    <div className='bg-primary'>
      <Home />
    </div>
  );
}
