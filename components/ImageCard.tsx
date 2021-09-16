export default function ImageCard({
  name,
  company,
  image,
}: {
  name: string;
  company: string;
  image: string;
}) {
  return (
    <div className="border-2 border-indigo-200 rounded-md">
      <img className="m-2 rounded-xl" src={image} width={200} height={200} />
      <div className="pt-1 border-b " />
      <h5 className="pt-2 text-sm font-extrabold">{name}</h5>
      <h6 className="pt-2 text-sm font-extrabold"> {company}</h6>
    </div>
  );
}
