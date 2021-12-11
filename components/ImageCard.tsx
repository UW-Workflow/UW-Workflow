export default function ImageCard({
  name,
  role,
  image,
  linkedin,
  github,
}: {
  name: string;
  role: string;
  image: string;
  linkedin: string;
  github: string;
}) {
  return (
    <div className="rounded-md mx-10">
      <img className="rounded-xl" src={image} width={200} height={200} />
      <h5 className="font-cabinet-grotesk font-normal text-lg mt-2">{name}</h5>
      <h6 className="font-cabinet-grotesk font-normal text-md mt-1"> {role}</h6>
      <h6 className="flex mr-2 mt-4">
        <a
          className="font-cabinet-grotesk font-bold text-sm text-blue-600"
          href={linkedin}
          target="_blank"
        >
          Linkedin
        </a>
        <a
          className="font-cabinet-grotesk font-bold text-sm pl-4"
          href={github}
          target="_blank"
        >
          Github
        </a>
      </h6>
    </div>
  );
}
