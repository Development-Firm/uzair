import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import { Autoplay, EffectFade } from "swiper/modules";
import { heroData } from "@/lib/data";
import Button from "../Button";
import Image from "next/image";
import heroBg from "@/assets/hero/hero-bg.png";
import Link from "next/link";

const Hero = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${heroBg.src})`, // Use .src for Next.js static assets
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="w-full h-screen relative "
    >
      {/* Gradient Overlay */}
      <div
        style={{
          background: "linear-gradient(to top, black, transparent)",
          opacity: 0.9, 
        }}
        className="absolute inset-0 z-5 "
      />
      <Swiper
        spaceBetween={30}
        speed={3000}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        effect={"fade"}
        fadeEffect={{ crossFade: true }}
        modules={[Autoplay, EffectFade]}
        className="mySwiper h-full max-w-[1200px] mx-auto"
      >
        {heroData.map(
          ({
            id,
            colorDeep,
            colorLite,
            mainText,
            subText,
            shadow,
            mobileShadow,
            img,
            buttonText,
            buttonLink
          }) => (
            <SwiperSlide
              key={id}
              className="w-full h-full flex flex-col md:gap-10 gap-4 pt-24 md:pt-16"
            >
              <main
                className={`flex lg:flex-row lg:items-center lg:justify-center h-full flex-col items-start z-10 relative `}
              >
                <div className="flex flex-col gap-4 lg:w-1/2 justify-center lg:items-start lg:text-left w-full items-center text-center mb-5 md:mb-0">
                  <h1 className="md:text-5xl text-4xl mx-auto lg:mx-0 font-bold leading-tight text-primary-foreground">
                    We&apos;re about{" "}
                    <span className="text-gradient">{mainText}!</span>
                  </h1>
                  <p className="leading-normal md:text-2xl text-lg text-primary-foreground px-10">
                    {subText}
                  </p>
                  <Link href={buttonLink} className="w-full" >
                    <Button
                      type="button"
                      text={buttonText}
                      className="mt-8 md:text-xl font-bold py-4 px-7 focus:outline-none md:ml-5"
                      style={
                        typeof window !== "undefined" && window.innerWidth > 767
                          ? {
                              backgroundColor: `${colorDeep}`,
                              boxShadow: `${shadow}`,
                            }
                          : {
                            backgroundColor: `${colorDeep}`,
                            boxShadow: `${mobileShadow}`,
                          }
                        }
                        />
                    </Link>
                </div>

                <div className="lg:w-1/2  w-full lg:mt-6 relative ">
                  <Image
                    src={img}
                    loading="eager"
                    alt={img}
                    className="w-3/5 mx-auto lg:ml-auto lg:mx-0 card-gradient-transparent rounded-lg p-5"
                    width={500}
                    height={300}
                  />
                </div>
              </main>
            </SwiperSlide>
          )
        )}
      </Swiper>
    </div>
  );
};

export default Hero;
