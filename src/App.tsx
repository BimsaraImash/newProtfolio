import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, /* keep the rest */ } from 'lucide-react';
import GradientDust from './components/GradientDust';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Phone,
  ExternalLink, 
  Menu, 
  X, 
  Code, 
  Database, 
  Globe,
  ArrowRight,
  Download,
  User,
  Briefcase,
  MessageCircle,
  ChevronLeft, 
  ChevronRight
} from 'lucide-react';
import aboutMeImg from "../public/img/about-me.png";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";


function App() {

  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollStrip = (dir: 'left' | 'right') => {
    const el = scrollerRef.current;
    if (!el) return;
    const cardWidth = 320; // match min-w below
    el.scrollBy({ left: dir === 'left' ? -cardWidth : cardWidth, behavior: 'smooth' });
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = ['home', 'about', 'projects', 'skills', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const skills = [
    { name: 'JavaScript/TypeScript', level: 85, color: 'from-yellow-400 to-orange-500' },
    { name: 'React/Next.js', level: 80, color: 'from-blue-400 to-cyan-500' },
    { name: 'Node.js', level: 75, color: 'from-green-400 to-emerald-500' },
    { name: 'Python', level: 70, color: 'from-blue-500 to-indigo-500' },
    { name: 'SQL/NoSQL', level: 65, color: 'from-purple-400 to-pink-500' },
    { name: 'Git/GitHub', level: 85, color: 'from-gray-600 to-gray-800' }
  ];

  const projects = [
    {
      title: 'PrimeCare – Property Management System',
      description: 'A comprehensive property management system enabling owners to oversee inventory, tenants, finances, and maintenance remotely.',
      image: '/img/primecare.jpeg',
      tech: ['PHP', 'Javascript', 'MySQL', 'CSS','Html'],
      github: 'https://github.com/PrimeCare-groupProject/PrimeCare_php_mvc.git'
    },
    {
      title: 'TravelSri – Smart Travel Management System',
      description: 'A unified platform simplifying travel in Sri Lanka with booking, payments, and real-time support.',
      image: '/img/travelsri.png',
      tech: ['React', 'React-Native', 'MongoDB', 'Spring Boot'],
      github: 'https://github.com/mr-chamika/TravelSri.git'
    },
    {
      title: 'RentOne - Mern Stack Car Rental Application',
      description: 'A car rental platform to browse, book, and manage vehicles with real-time availability',
      image: '/img/rentone.png',
      tech: ['React', 'Node.js', 'Express.js', 'MongoDB'],
      github: 'https://github.com/BimsaraImash/MernApp.git'
    },
    {
      title: 'Petcart - Online Pet Selling Platform',
      description: 'A platform for buying and selling pets with easy listing management and pet care info.',
      image: '/img/petcart.png',
      tech: ['React', 'mongoDB', 'Spring-Boot', 'Tailwind CSS'],
      github: 'https://github.com/PetKart/petkart.git'
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      <GradientDust />
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/90 backdrop-blur-sm shadow-lg border-b border-gray-800' : 'bg-transparent'
      }`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Bimsara Imash
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {[
                { id: 'home', label: 'Home', icon: User },
                { id: 'about', label: 'About', icon: User },
                { id: 'projects', label: 'Projects', icon: Briefcase },
                { id: 'skills', label: 'Skills', icon: Code },
                { id: 'contact', label: 'Contact', icon: MessageCircle }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    activeSection === id
                      ? 'text-blue-400 bg-gray-800'
                      : 'text-gray-300 hover:text-blue-400 hover:bg-gray-800'
                  }`}
                >
                  <Icon size={16} />
                  <span>{label}</span>
                </button>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-300 hover:text-blue-400 transition-colors duration-200"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-black border-t border-gray-800 shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {[
                { id: 'home', label: 'Home' },
                { id: 'about', label: 'About' },
                { id: 'projects', label: 'Projects' },
                { id: 'skills', label: 'Skills' },
                { id: 'contact', label: 'Contact' }
              ].map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-gray-300 hover:text-blue-400 hover:bg-gray-800 rounded-md transition-colors duration-200"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      {/* Hero Section */}
<section
  id="home"
  className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 pt-20"
>
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="mb-8"
    >
      <img
        src="/img/about-me.png"   // ✅ fixed image reference
        alt="Bimsara Imash"
        className="w-32 h-32 rounded-full mx-auto mb-6 object-cover shadow-xl ring-4 ring-white"
      />

      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
        Hi, I'm{" "}
        <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          <Typewriter
            words={["Bimsara Imash"]}
            loop={1}               // ✅ typewriter runs once
            cursor
            cursorStyle="|"
            typeSpeed={120}
            deleteSpeed={80}
            delaySpeed={1500}
          />
        </span>
      </h1>

      <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
        Passionate Software Engineering Intern building innovative solutions with modern technologies
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
        <button
          onClick={() => scrollToSection("projects")}
          className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          View My Work
          <ArrowRight size={20} className="ml-2" />
        </button>
        <button className="inline-flex items-center px-8 py-3 border-2 border-gray-600 text-gray-300 font-medium rounded-lg hover:border-blue-400 hover:text-blue-400 transition-all duration-200">
          <Download size={20} className="mr-2" />
          Download Resume
        </button>
      </div>
    </motion.div>

     {/* Social Links */}
          <div className="flex items-center justify-center space-x-6 mt-12">
            {[
              { icon: Github, href: 'https://github.com/BimsaraImash', label: 'GitHub' },
              { icon: Linkedin, href: 'https://www.linkedin.com/in/bimsara-imash-b97081282/', label: 'LinkedIn' },
              { icon: Mail, href: 'mailto:bimsa2021@gmail.com', label: 'Email' }
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-800 rounded-full shadow-md hover:shadow-lg text-gray-300 hover:text-blue-400 transition-all duration-200 transform hover:-translate-y-1"
                aria-label={label}
              >
                <Icon size={24} />
              </a>
            ))}
          </div>
  </div>
</section>


      {/* About Section */}
      <section id="about" className="py-20 bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">About Me</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto"></div>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="About Alex"
                className="rounded-2xl shadow-2xl w-full object-cover h-96"
              />
            </div>
            <div className="space-y-6">
             <div className="space-y-6">
                <p className="text-lg text-gray-300 leading-relaxed">
                  I'm a Computer Science undergraduate at the <strong>University of Colombo School of Computing (UCSC)</strong>, 
                  with a passion for creating innovative software solutions through internships and personal projects.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                  My journey in technology began at <strong>Richmond College, Galle</strong>, where I developed a strong foundation in mathematics, science, and leadership skills that inspired my pursuit of software development.
                </p>
              </div>


              
              <div className="grid sm:grid-cols-2 gap-6 mt-8">
                {[
                  { icon: Code, label: 'Clean Code', desc: 'Writing maintainable, readable code' },
                  { icon: Database, label: 'Full Stack', desc: 'Frontend and backend development' },
                  { icon: Globe, label: 'Web Technologies', desc: 'Modern web frameworks & tools' },
                  { icon: Github, label: 'Version Control', desc: 'Git workflow and collaboration' }
                ].map(({ icon: Icon, label, desc }) => (
                  <div key={label} className="flex items-start space-x-3">
                    <div className="p-2 bg-gray-800 rounded-lg">
                      <Icon size={20} className="text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{label}</h4>
                      <p className="text-sm text-gray-400">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">My Projects</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-6"></div>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Here are some of my recent projects that showcase my skills and passion for development
          </p>
        </div>

        {/* Controls */}
        <div className="relative">
          <button
            onClick={() => scrollStrip('left')}
            className="hidden md:flex absolute -left-3 top-1/2 -translate-y-1/2 z-10 p-2 rounded-xl bg-gray-900/80 border border-gray-800 hover:bg-gray-800 transition"
            aria-label="Scroll left"
          >
            <ArrowLeft size={20} />
          </button>
          <button
            onClick={() => scrollStrip('right')}
            className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 p-2 rounded-xl bg-gray-900/80 border border-gray-800 hover:bg-gray-800 transition"
            aria-label="Scroll right"
          >
            <ArrowRight size={20} />
          </button>

          {/* Horizontal scroller */}
          <div
            ref={scrollerRef}
            className="flex gap-6 overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory px-1 pb-2 scrollbar-hide"
          >

            {projects.map((project, index) => (
              <div
                key={index}
                className="min-w-[320px] max-w-[360px] snap-start bg-gray-900 border border-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-44 object-cover transition-transform duration-300 hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-gray-300 mb-4 line-clamp-3">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-gray-800 text-blue-400 text-xs font-medium rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex space-x-3">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
                    >
                      <Github size={16} className="mr-2" />
                      Code
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile hint */}
          <div className="mt-4 text-center md:hidden text-xs text-gray-400">
            Swipe to see more →
          </div>
        </div>
      </div>
    </section>


      {/* Skills Section */}
    <section id="skills" className="py-20 bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Technical Skills</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-6"></div>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Technologies and tools I work with to bring ideas to life
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Frontend */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Frontend</h3>
            <div className="flex flex-wrap gap-2">
              {['React', 'HTML', 'CSS', 'Tailwind CSS', 'JavaScript', 'TypeScript', 'Figma'].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-gradient-to-r from-blue-400 to-purple-500 text-black rounded-full text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Backend */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Backend</h3>
            <div className="flex flex-wrap gap-2">
              {['Node.js', 'Express.js', 'PHP', 'Spring Boot'].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-gradient-to-r from-green-400 to-emerald-500 text-black rounded-full text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Databases */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Databases</h3>
            <div className="flex flex-wrap gap-2">
              {['MongoDB', 'MySQL', 'SQL'].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-gradient-to-r from-purple-400 to-pink-500 text-black rounded-full text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Other Skills */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Languages</h3>
            <div className="flex flex-wrap gap-2">
              {['C', 'C++', 'Java', 'Python', 'Scala'].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-black rounded-full text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          
          {/* Other Skills */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Other Skills</h3>
            <div className="flex flex-wrap gap-2">
              {['Git', 'GitHub', 'Docker', 'REST APIs', 'Agile/Scrum'].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-black rounded-full text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>


      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Get In Touch</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-6"></div>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology
            </p>
          </div>
          
          <div className="bg-gray-900 border border-gray-800 rounded-2xl shadow-xl p-8">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 bg-black border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 bg-black border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="bimsa@example.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full px-4 py-3 bg-black border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Let's work together"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full px-4 py-3 bg-black border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                  placeholder="Tell me about your project or opportunity..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium py-3 px-6 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Send Message
              </button>
            </form>
            
            <div className="mt-8 pt-8 border-t border-gray-800">
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8">
                <a
                  href="mailto:bimsa2021@gmail.com"
                  className="flex items-center space-x-2 text-gray-300 hover:text-blue-400 transition-colors duration-200"
                >
                  <Mail size={20} />
                  <span>bimsa2021@example.com</span>
                </a>
                <div className="flex items-center space-x-4">
                  {[
                    { icon: Github, href: 'https://github.com/BimsaraImash', label: 'GitHub' },
                    { icon: Linkedin, href: 'https://www.linkedin.com/in/bimsara-imash-b97081282/', label: 'LinkedIn' }
                  ].map(({ icon: Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-gray-800 rounded-full text-gray-300 hover:text-blue-400 hover:bg-gray-700 transition-all duration-200"
                      aria-label={label}
                    >
                      <Icon size={20} />
                    </a>
                  ))}

                  {/* Phone Number */}
                  <a
                    href="tel:+94771234567"
                    className="flex items-center space-x-2 p-2 bg-gray-800 rounded-full text-gray-300 hover:text-blue-400 hover:bg-gray-700 transition-all duration-200"
                  >
                    <Phone size={20} /> {/* You can replace User with Phone icon */}
                    <span>+94 78 311 8863</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2025 Bimsara Imash. Built with React and Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
