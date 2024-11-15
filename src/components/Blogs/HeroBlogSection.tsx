
const HeroBlogSection = () => {
  return (
    <section className="relative bg-primary text-white py-20 px-6">
      <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: 'url(https://source.unsplash.com/1600x900/?nature,blog)' }}></div>
      <div className="relative z-10 text-center">
        <h1 className="text-4xl  md:text-5xl font-semibold leading-tight mb-4">Taxate : A tax show</h1>
        <p className="text-xl  md:text-2xl mb-6 max-w-3xl mx-auto">Explore interesting articles, tips, and stories across various topics. Stay updated with fresh content every week!</p>
      </div>
    </section>
  );
};

export default HeroBlogSection;
