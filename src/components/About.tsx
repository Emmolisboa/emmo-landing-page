export default function About() {
  return (
    <section
      id="about"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          About
        </h2>
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            Welcome to the world of Emmo. A passionate musician dedicated to
            creating authentic and moving musical experiences.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            With a unique blend of styles and influences, Emmo brings fresh
            perspectives to the music scene. Each composition tells a story,
            each performance is an invitation to connect.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            Explore the gallery, watch the latest videos, and connect through
            social media to stay updated on new releases and upcoming shows.
          </p>
        </div>
      </div>
    </section>
  );
}
