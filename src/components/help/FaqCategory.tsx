
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface FAQ {
  question: string;
  answer: string;
}

interface CategoryProps {
  name: string;
  questions: FAQ[];
}

const FaqCategory = ({ name, questions }: CategoryProps) => {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-6 pb-2 border-b">{name}</h2>
      <Accordion type="single" collapsible className="w-full">
        {questions.map((faq, faqIndex) => (
          <AccordionItem key={faqIndex} value={`${name}-${faqIndex}`}>
            <AccordionTrigger className="text-lg font-medium text-left">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-base">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FaqCategory;
