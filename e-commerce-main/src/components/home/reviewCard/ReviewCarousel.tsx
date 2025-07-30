import { useState } from "react";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { reviews } from "../../../data/reviews.ts";
import CarouselTrack from "./CarouselTrack.tsx";
import RoundedButton from "../../common/RoundedButton.tsx";
import { Card, Typography } from "@mui/material";

export default function ReviewCarousel() {
  const CARD_WIDTH = 260;
  const TOTAL = reviews.length;
  const [index, setIndex] = useState(0);
  const [transition, setTransition] = useState(true);
  const [position, setPosition] = useState(-CARD_WIDTH);

  const getCarouselItems = () => {
    return [
      reviews[(index - 1 + TOTAL) % TOTAL],
      reviews[index % TOTAL],
      reviews[(index + 1) % TOTAL],
      reviews[(index + 2) % TOTAL],
      reviews[(index + 3) % TOTAL],
    ];
  };

  const [carouselItems, setCarouselItems] = useState(getCarouselItems);

  const handleSlide = (dir: "left" | "right") => {
    if (!transition) return;
    const offset = dir === "right" ? -CARD_WIDTH : CARD_WIDTH;
    setPosition((prev) => prev + offset);

    setTimeout(() => {
      setTransition(false);
      const newIndex =
        dir === "right" ? (index + 1) % TOTAL : (index - 1 + TOTAL) % TOTAL;
      setIndex(newIndex);
      setCarouselItems(getCarouselItems());
      setPosition(-CARD_WIDTH);
      setTimeout(() => setTransition(true), 20);
    }, 300);
  };

  return (
    <>
      <Card className="col-span-12 w-full p-4">
        <Typography variant="h3" align="center" color="#4f5151">
            NHỮNG KHÁCH HÀNG HẠNH PHÚC CỦA CHÚNG TÔI
        </Typography>
      </Card>
      <div className="w-full max-w-5xl mx-auto text-center my-10 px-4">
        <div className="flex items-center justify-center gap-4">
          <RoundedButton
            icon={<ArrowBackIos />}
            onClick={() => handleSlide("left")}
            backgroundColor="#e7ada1"
            hoverBackgroundColor="#e9c7c0"
            borderRadius= {false}
            iconPosition="left"
          >
            &nbsp;
          </RoundedButton>

          <div className="overflow-hidden w-[800px] h-[240px] relative">
            <CarouselTrack
              items={carouselItems}
              transition={transition}
              position={position}
            />
          </div>

          <RoundedButton
            icon={<ArrowForwardIos />}
            onClick={() => handleSlide("right")}
            backgroundColor="#e7ada1"
            hoverBackgroundColor="#e9c7c0"
            borderRadius= {false}
            iconPosition="right"
          >
            &nbsp;
          </RoundedButton>
        </div>
      </div>
    </>
  );
}
