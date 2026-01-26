import { SectionLayout } from "@/layouts";
import { cn } from "@/lib/utils";
import {
  motion,
  MotionValue,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef } from "react";

const AGENTS_EXAMPLE = [
  {
    id: "jackie_agent",
    name: "Jackie",
    description: "AI Counselor",
    image: "/assets_ai/images/jackie.png",
    text: "Jackie is Passage's AI Counselor. She helps the talent pick the best opportunity, answer questions, and guide them through the application process.",
  },
  {
    id: "ella_agent",
    name: "Ella",
    description: "AI Interviewer",
    image: "/assets_ai/images/ella.png",
    text: "Ella is Passage's AI interviewer. She conducts AI video interviews with talent and assesses their skills and qualifications.",
  },
  {
    id: "david_agent",
    name: "David",
    description: "AI Processor",
    image: "/assets_ai/images/david.png",
    text: "David is Passage's AI processor. He processes talent's documents with high speed and precision, ensuring instant handling and maximum accuracy.",
  },
  {
    id: "mark_agent",
    name: "Mark",
    description: "AI Support",
    image: "/assets_ai/images/mark.jpg",
    text: "Mark is Passage's AI support agent. He assists talent by resolving general issues and providing ongoing help throughout the entire application journey.",
  },
];

interface WordProps {
  word: string;
  index: number;
  totalWords: number;
  scrollYProgress: MotionValue<number>;
}

const Word = ({ word, index, totalWords, scrollYProgress }: WordProps) => {
  // Calculate opacity based on scroll progress and word index
  const wordProgress = index / totalWords;

  const opacity = useMotionValue(0.1);
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest >= wordProgress) {
      opacity.set(1);
    } else {
      opacity.set(0.1);
    }
  });

  return (
    <motion.span
      className="text-foreground text-md lg:text-2xl font-medium transition-opacity duration-200"
      style={{ opacity }}
    >
      {word}
    </motion.span>
  );
};

const StickyText = ({
  allWords,
  scrollYProgress,
}: {
  allWords: (string | { type: "linebreak" })[];
  scrollYProgress: MotionValue<number>;
}) => {
  return (
    <div className="sticky left-0 top-0 h-dvh w-full lg:w-[calc(50%-20px)] flex flex-col justify-center items-start gap-4 z-10">
      <span className="text-amber-400 text-xs font-bold uppercase">
        Meet the team
      </span>
      <div className="flex flex-wrap gap-1">
        {allWords.map((item, index) => {
          if (typeof item === "object" && item.type === "linebreak") {
            return (
              <div key={`linebreak-${index}`} className="w-full lg:h-4 h-1" />
            );
          }

          return (
            <Word
              key={`${item}-${index}`}
              word={item as string}
              index={index}
              totalWords={allWords.length}
              scrollYProgress={scrollYProgress}
            />
          );
        })}
      </div>
    </div>
  );
};

const AgentComponent = ({
  agent,
  index,
  scrollYProgress,
  mobile,
}: {
  agent: (typeof AGENTS_EXAMPLE)[number];
  index: number;
  scrollYProgress: MotionValue<number>;
  mobile?: boolean;
}) => {
  const rangeLength = 1 / AGENTS_EXAMPLE.length;
  const range = [index * rangeLength, (index + 1) * rangeLength];
  const isOdd = index % 2 === 0;

  //   const startingOpacity = 0.4;
  const startingBlur = 1.5;

  const imageScale = useTransform(
    scrollYProgress,
    [0, range[0], range[1]],
    [1, 1, !mobile ? 1.1 : 1],
  );

  const imageBlur = useTransform(
    scrollYProgress,
    [0, range[0], range[1]],
    [startingBlur, startingBlur, 0],
  );

  const imageBlurFilter = useMotionTemplate`blur(${imageBlur}px)`;

  const rotation = useTransform(
    scrollYProgress,
    range,
    isOdd ? [2 + 2 * index, 0] : [0, 2 + 2 * index],
  );
  return (
    <motion.div
      key={agent.id}
      className={cn(
        "sticky h-dvh  flex items-center justify-center ",
        mobile ? "top-8" : "top-0",
      )}
    >
      <motion.div
        className={`relative w-sm rounded-xl object-cover overflow-clip   ${
          mobile ? "w-[60vw] h-[70vh]" : "h-[600px]"
        }`}
        style={{
          zIndex: index,
          rotate: rotation,
          scale: imageScale,
        }}
      >
        <div className="lg:hidden absolute w-full h-1/2 bottom-0 bg-gradient-to-t from-black to-transparent z-20 p-4 flex flex-col gap-1 justify-end">
          <h3 className="text-white text-2xl font-bold">{agent.name}</h3>
          <p className="text-white/80 text-md">{agent.text}</p>
        </div>
        <motion.img
          src={agent.image}
          alt={agent.name}
          className="w-full h-full object-cover"
          style={{
            filter: imageBlurFilter,
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export const ExamplesSection = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const targetRefMobile = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const { scrollYProgress: scrollYProgressMobile } = useScroll({
    target: targetRefMobile,
  });

  // Combine all words from AGENTS_EXAMPLE text fields with line breaks between agents
  const allWords = AGENTS_EXAMPLE.reduce((acc, agent, agentIndex) => {
    const words = agent.text.split(" ").filter((word) => word.trim() !== "");
    acc.push(...words);

    // Add line break marker after each agent except the last one
    if (agentIndex < AGENTS_EXAMPLE.length - 1) {
      acc.push({ type: "linebreak" });
    }

    return acc;
  }, [] as (string | { type: "linebreak" })[]);

  return (
    <SectionLayout className="overflow-x-clip w-vw max-w-vw container mx-auto">
      <div
        ref={targetRef}
        className="w-full relative hidden lg:block"
        style={{ height: `${AGENTS_EXAMPLE.length * 100}vh` }}
      >
        <StickyText allWords={allWords} scrollYProgress={scrollYProgress} />
        <div className="absolute right-0 top-0 w-1/2 h-full hidden lg:block">
          {AGENTS_EXAMPLE.map((agent, index) => {
            return (
              <AgentComponent
                key={agent.id}
                agent={agent}
                index={index}
                scrollYProgress={scrollYProgress}
              />
            );
          })}
        </div>
      </div>
      <div
        ref={targetRefMobile}
        className="w-full lg:hidden"
        style={{ height: `${AGENTS_EXAMPLE.length * 100}vh` }}
      >
        {AGENTS_EXAMPLE.map((agent, index) => {
          return (
            <AgentComponent
              key={agent.id}
              agent={agent}
              index={index}
              scrollYProgress={scrollYProgressMobile}
              mobile
            />
          );
        })}
      </div>
    </SectionLayout>
  );
};
