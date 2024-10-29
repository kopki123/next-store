import { Separator } from '@/components/ui/separator';

function SectionTitle({ text }: { text: string }) {
  return (
    <div>
      <h2 className='text-3xl font-medium tracking-wider'>
        {text}
      </h2>
      <Separator />
    </div>
  );
}

export default SectionTitle;