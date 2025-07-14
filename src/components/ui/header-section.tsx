interface Props {
  title: string;
  description?: string;
}

export function HeaderSection({ title, description }: Props) {
  return (
    <div className="text-center mb-8 bg-slate-200 w-full py-8 px-4">
      <p className="text-3xl md:text-4xl font-bold text-gray-800">{title}</p>
      {description && <p className="text-xl text-gray-600 max-w-2xl mx-auto mt-4">{description}</p>}
    </div>
  );
}
