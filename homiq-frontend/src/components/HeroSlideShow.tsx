import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import type { HeroSlideshowProps } from "../models/components";



const HeroSlideshow: React.FC<HeroSlideshowProps> = (
    {slides}
) => {

  return (
    <div className="w-full h-full">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        className="w-full h-full"
      >
        {slides?.map((url, idx) => (
          <SwiperSlide key={idx}>
            <div className="relative w-full h-full">
              <img
                src={url}
                alt={`Slide ${idx}`}
                className="w-full h-full object-cover transform scale-105 transition-transform duration-[3000ms] rounded-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
              <div className="absolute bottom-10 left-8 text-white">
                <h2 className="text-3xl font-bold">Shop Smart</h2>
                <p className="mt-2 text-lg">
                  Find the best deals on tech & furniture
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
export default HeroSlideshow;
