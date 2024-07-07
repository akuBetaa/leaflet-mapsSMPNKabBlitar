import React from 'react'
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import Maps from '@/components/Maps';
import LongdistanceSchool from '@/components/LongdistanceSchool';

const Beranda = () => {
    return (
        <Layout>
            {/* banner  */}
            <div className='banner bg-[F7F7FD] min-h-[560px] flex flex-col justify-center items-center text-center space-y-2 md:space-y-3'>
                <h1 className='text-2xl md:text-5xl font-bold text-card-foreground tracking-wide leading-tight'>
                    Temukan Zonasi <br />
                    Sekolah Terdekat dari Rumahmu
                </h1>
                <p className='text-xs md:text-base text-secondary-foreground px-10'>
                    Berikan rekomendasi zonasi sekolah menengah pertama negeri terdekat untukmu
                </p>
                <div className='pt-6 md:pt-5'>
                    <Button className="">Cek Rekomendasi Terdekat</Button>
                </div>
            </div>

            {/* Maps  */}
            <div className='p-10 md:px-20 md:py-20'>
                <div className='flex flex-col md:space-y-2'>
                    <h2 className='text-card-foreground font-semibold text-lg md:text-3xl text-center'>
                        Peta Persebaran SMP Negeri se-Kab. Blitar
                    </h2>
                    <p className='text-xs md:text-base text-secondary-foreground text-center'>
                        Klik peta untuk melihat detail sekolah menengah pertama negeri
                    </p>
                </div>
                <div className='mt-2'>
                    <Maps />
                </div>
            </div>

            {/* Cek Rekomendasi  */}
            <div className='mx-20 bg-muted rounded-xl'>
                <LongdistanceSchool />
            </div>
        </Layout>
    )
}

export default Beranda