import ImageCard from "../components/ImageCard";

export default function Teams() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="grid grid-cols-2 grid-rows-2 gap-4">
        <div className="">
          <ImageCard
            name="Tony Kappen"
            company="abc Inc"
            image="/images/tony.jpg"
          ></ImageCard>
        </div>
        <div className="">
          {" "}
          <ImageCard
            name="Dhviti Patel"
            company="Facebook Inc"
            image="/images/dhviti.jpg"
          ></ImageCard>
        </div>
        <div className="">
          {" "}
          <ImageCard
            name="Sneh Koul"
            company="Coinbase Inc"
            image="/images/sneh.jpg"
          ></ImageCard>
        </div>
        <div className="">
          {" "}
          <ImageCard
            name="Akshaya Rajgopalan"
            company="Canix Inc"
            image="/images/akshaya.jpg"
          ></ImageCard>
        </div>
      </div>
    </div>
  );
}
