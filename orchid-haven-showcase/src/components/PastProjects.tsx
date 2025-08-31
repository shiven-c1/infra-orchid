import { useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import { externalProjects } from "@/data/externalProjects";

const PastProjects = () => {
  const [api, setApi] = useState<CarouselApi | null>(null);
  useEffect(() => {
    if (!api) return;
    const timer = setInterval(() => {
      api.scrollNext();
    }, 2500);
    return () => clearInterval(timer);
  }, [api]);

  return (
    <section className="pt-10 pb-2 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-2xl md:text-4xl font-black text-center mb-6 bg-gradient-to-r from-[#2e1065] via-[#3b0764] to-[#4c1d95] bg-clip-text text-transparent">Past Projects</h3>
        <Carousel setApi={setApi} opts={{ loop: true, align: "start" }} className="w-full">
          <CarouselContent>
            {externalProjects.map((p, idx) => (
              <CarouselItem key={idx} className="md:basis-1/2 lg:basis-1/3">
                <div className="rounded-xl overflow-hidden border border-border bg-card/70">
                  <div className="bg-black/10">
                    {p.imageUrl ? (
                      <img src={p.imageUrl} alt={p.name} className="w-full h-auto object-contain" />
                    ) : (
                      <div className="w-full h-48 bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center text-white text-xl font-extrabold">
                        {p.name}
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <div className="text-sm text-muted-foreground">{p.location}</div>
                    <div className="text-base font-semibold text-foreground">{p.name}</div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-4 bg-background/70 backdrop-blur border-border" />
          <CarouselNext className="-right-4 bg-background/70 backdrop-blur border-border" />
        </Carousel>
      </div>
    </section>
  );
};

export default PastProjects;


