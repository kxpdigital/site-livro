/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Heart, 
  Sparkles, 
  Star, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  Zap, 
  Quote,
  Instagram,
  Twitter,
  Facebook,
  ChevronRight
} from 'lucide-react';

// --- Components ---

const Button = ({ children, className = "", primary = false, ...props }: { children: React.ReactNode; className?: string; primary?: boolean; [key: string]: any }) => (
  <motion.button
    whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(157, 0, 255, 0.5)" }}
    whileTap={{ scale: 0.95 }}
    className={`px-8 py-4 rounded-full font-display font-bold text-sm tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 ${
      primary 
        ? "bg-neon-purple text-white shadow-[0_0_15px_rgba(157,0,255,0.4)] hover:bg-white hover:text-deep-black" 
        : "border border-white/20 text-white hover:bg-white/10"
    } ${className}`}
    {...props}
  >
    {children}
  </motion.button>
);

const SectionTitle = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="mb-16 text-center">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-4xl md:text-6xl font-serif italic mb-4 neon-text"
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-white/60 font-sans max-w-2xl mx-auto"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

const BookCard = ({ book, index }: { book: any; index: number; key?: any }) => (
  <motion.div
    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className="glass p-8 rounded-3xl flex flex-col md:flex-row gap-12 items-center"
  >
    <div className="w-full md:w-1/2 relative group">
      <div className="absolute -inset-4 bg-gradient-to-r from-neon-purple to-electric-blue opacity-20 blur-2xl group-hover:opacity-40 transition-opacity duration-500 rounded-full" />
      <img 
        src={book.image} 
        alt={book.title} 
        className="relative z-10 w-full max-w-[300px] mx-auto rounded-lg shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
        referrerPolicy="no-referrer"
      />
    </div>
    <div className="w-full md:w-1/2 space-y-6">
      <div className="space-y-2">
        <h3 className="text-3xl font-serif italic">{book.title}</h3>
        <p className="text-electric-blue font-display text-sm tracking-widest uppercase">{book.tagline}</p>
      </div>
      <p className="text-white/70 leading-relaxed">{book.description}</p>
      
      <div className="space-y-4 py-6 border-y border-white/10">
        {book.quotes.map((quote: string, i: number) => (
          <div key={i} className="flex gap-4 italic text-white/90">
            <Quote className="w-5 h-5 text-neon-purple shrink-0" />
            <p>"{quote}"</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {book.benefits.map((benefit: string, i: number) => (
          <div key={i} className="flex items-center gap-2 text-xs font-display text-white/50 uppercase tracking-tighter">
            <Sparkles className="w-3 h-3 text-electric-blue" />
            {benefit}
          </div>
        ))}
      </div>

      <Button primary className="w-full md:w-auto">
        Comprar este livro <ArrowRight className="w-4 h-4" />
      </Button>
    </div>
  </motion.div>
);

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({ h: 2, m: 45, s: 12 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.s > 0) return { ...prev, s: prev.s - 1 };
        if (prev.m > 0) return { ...prev, m: prev.m - 1, s: 59 };
        if (prev.h > 0) return { ...prev, h: prev.h - 1, m: 59, s: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const format = (n: number) => n.toString().padStart(2, '0');

  return (
    <div className="flex gap-4 font-display">
      {[
        { label: 'Horas', val: format(timeLeft.h) },
        { label: 'Minutos', val: format(timeLeft.m) },
        { label: 'Segundos', val: format(timeLeft.s) }
      ].map((item, i) => (
        <div key={i} className="text-center">
          <div className="text-3xl md:text-4xl font-bold neon-text bg-white/5 px-4 py-2 rounded-xl border border-white/10">
            {item.val}
          </div>
          <div className="text-[10px] uppercase tracking-widest mt-2 text-white/40">{item.label}</div>
        </div>
      ))}
    </div>
  );
};

// --- Main App ---

export default function App() {
  const books = [
    {
      title: "Ecos do Silêncio",
      tagline: "A jornada da alma",
      description: "Uma exploração profunda das emoções humanas através de versos que tocam o âmago do ser. Marcos convida o leitor a mergulhar em um mar de reflexões e sentimentos puros.",
      image: "https://picsum.photos/seed/book1/600/900",
      quotes: [
        "O silêncio é a música que a alma canta quando o mundo se cala.",
        "Nas frestas do tempo, encontrei a eternidade de um olhar."
      ],
      benefits: ["Inspiração", "Reflexão", "Conexão Emocional", "Beleza Literária"]
    },
    {
      title: "Luzes de Neon",
      tagline: "Poesia Urbana Futurista",
      description: "A poesia encontra a modernidade em uma obra vibrante e impactante. Marcos retrata a vida contemporânea com uma sensibilidade única, transformando o cotidiano em arte.",
      image: "https://picsum.photos/seed/book2/600/900",
      quotes: [
        "As luzes da cidade escondem as estrelas, mas revelam nossos segredos.",
        "Somos bits de emoção em um processador de saudades."
      ],
      benefits: ["Modernidade", "Introspecção", "Impacto Visual", "Arte Contemporânea"]
    }
  ];

  const testimonials = [
    { name: "Ana Silva", text: "As poesias do Marcos mudaram minha forma de ver o mundo. É impossível ler e não se emocionar.", rating: 5 },
    { name: "Ricardo Costa", text: "Uma escrita poderosa e autêntica. Recomendo a todos que buscam profundidade.", rating: 5 },
    { name: "Juliana Mendes", text: "O design dos livros é tão lindo quanto as palavras. Uma obra de arte completa.", rating: 5 }
  ];

  return (
    <div className="min-h-screen font-sans selection:bg-neon-purple selection:text-white">
      
      {/* Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-neon-purple/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-electric-blue/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 glass border-b-0">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-serif italic neon-text">Marcos</div>
          <div className="hidden md:flex gap-8 text-xs font-display tracking-widest uppercase text-white/60">
            <a href="#livros" className="hover:text-white transition-colors">Livros</a>
            <a href="#autor" className="hover:text-white transition-colors">O Autor</a>
            <a href="#experiencia" className="hover:text-white transition-colors">Experiência</a>
          </div>
          <Button className="px-6 py-2 text-xs">Comprar</Button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-neon-purple/30 text-xs font-display tracking-widest uppercase text-neon-purple">
              <Sparkles className="w-4 h-4" /> Edição Especial de Lançamento
            </div>
            <h1 className="text-6xl md:text-8xl font-serif italic leading-tight">
              Palavras que <br />
              <span className="neon-text">atravessam</span> a alma.
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-lg leading-relaxed">
              Descubra a intensidade das poesias de Marcos. Uma jornada imersiva entre o silêncio e a luz, onde cada verso é um convite à reflexão.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button primary className="text-base">Quero ler agora</Button>
              <Button className="text-base">Ver detalhes</Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-neon-purple/30 to-electric-blue/30 blur-[100px] rounded-full" />
            <div className="relative flex justify-center items-center gap-4 md:gap-8">
              <motion.img 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                src={books[0].image} 
                alt="Book 1" 
                className="w-1/2 max-w-[240px] rounded-lg shadow-2xl border border-white/10 rotate-[-5deg]"
                referrerPolicy="no-referrer"
              />
              <motion.img 
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                src={books[1].image} 
                alt="Book 2" 
                className="w-1/2 max-w-[240px] rounded-lg shadow-2xl border border-white/10 rotate-[5deg] mt-12"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
        </div>
      </header>

      {/* Author Section */}
      <section id="autor" className="py-24 px-6 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-square max-w-md mx-auto"
            >
              <div className="absolute inset-0 border-2 border-neon-purple rounded-3xl rotate-6" />
              <div className="absolute inset-0 border-2 border-electric-blue rounded-3xl -rotate-3" />
              <img 
                src="https://picsum.photos/seed/author/800/800" 
                alt="Marcos" 
                className="relative z-10 w-full h-full object-cover rounded-3xl grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <div className="space-y-8">
              <SectionTitle title="O Escritor" />
              <div className="space-y-6 text-white/80 leading-relaxed text-lg">
                <p>
                  Marcos não apenas escreve; ele esculpe sentimentos em forma de palavras. Com uma trajetória marcada pela busca incessante da verdade emocional, suas obras tornaram-se refúgio para milhares de leitores.
                </p>
                <p>
                  Sua escrita conecta o clássico ao futurista, trazendo uma sensibilidade que transcende gerações. Cada livro é um pedaço de sua alma, entregue para aqueles que não têm medo de sentir.
                </p>
                <div className="flex gap-6 pt-4">
                  <a href="#" className="p-3 rounded-full glass hover:text-neon-purple transition-colors"><Instagram /></a>
                  <a href="#" className="p-3 rounded-full glass hover:text-electric-blue transition-colors"><Twitter /></a>
                  <a href="#" className="p-3 rounded-full glass hover:text-neon-purple transition-colors"><Facebook /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Books Section */}
      <section id="livros" className="py-24 px-6">
        <div className="max-w-7xl mx-auto space-y-24">
          <SectionTitle 
            title="As Obras" 
            subtitle="Explore os dois universos criados por Marcos. Cada livro é uma experiência única de imersão e descoberta."
          />
          <div className="space-y-16">
            {books.map((book, i) => (
              <BookCard key={i} book={book} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experiencia" className="py-24 px-6 bg-gradient-to-b from-transparent to-neon-purple/5">
        <div className="max-w-7xl mx-auto">
          <SectionTitle title="A Experiência" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Heart, title: "Emoção Pura", desc: "Sinta cada palavra vibrar em sincronia com seu coração." },
              { icon: BookOpen, title: "Introspecção", desc: "Um convite para olhar para dentro e descobrir novos mundos." },
              { icon: Sparkles, title: "Beleza", desc: "Estética literária que encanta os olhos e a alma." },
              { icon: Zap, title: "Impacto", desc: "Reflexões profundas que mudam sua forma de ver a vida." }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass p-8 rounded-3xl text-center space-y-4 hover:neon-border transition-all duration-300"
              >
                <div className="w-16 h-16 mx-auto bg-neon-purple/10 rounded-2xl flex items-center justify-center">
                  <item.icon className="w-8 h-8 text-neon-purple" />
                </div>
                <h3 className="text-xl font-display font-bold uppercase tracking-widest">{item.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionTitle title="Vozes de Quem Leu" />
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="glass p-8 rounded-3xl space-y-6 relative"
              >
                <Quote className="absolute top-6 right-6 w-8 h-8 text-white/5" />
                <div className="flex gap-1">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-neon-purple text-neon-purple" />
                  ))}
                </div>
                <p className="text-white/80 italic leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-purple to-electric-blue" />
                  <span className="font-display text-sm font-bold uppercase tracking-widest">{t.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offer */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto glass p-12 md:p-20 rounded-[40px] relative overflow-hidden text-center space-y-12">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-purple via-electric-blue to-neon-purple" />
          
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-serif italic neon-text">Oferta de Lançamento</h2>
            <p className="text-xl text-white/70">Garanta os dois exemplares com um desconto exclusivo e bônus digital.</p>
          </div>

          <div className="flex flex-col items-center gap-8">
            <CountdownTimer />
            <div className="space-y-2">
              <div className="text-white/40 line-through text-2xl">R$ 129,90</div>
              <div className="text-6xl md:text-8xl font-display font-black neon-text">R$ 79,90</div>
              <p className="text-sm text-electric-blue font-display tracking-widest uppercase">Disponível por tempo limitado</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-center gap-8 text-sm font-display text-white/60">
            <div className="flex items-center gap-2"><ShieldCheck className="text-neon-purple" /> Pagamento Seguro</div>
            <div className="flex items-center gap-2"><Clock className="text-neon-purple" /> Entrega Imediata (Digital)</div>
            <div className="flex items-center gap-2"><Sparkles className="text-neon-purple" /> Bônus Exclusivo</div>
          </div>

          <Button primary className="w-full md:w-auto text-xl px-12 py-6">
            Garantir meu exemplar <ArrowRight />
          </Button>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-32 px-6 overflow-hidden text-center">
        <div className="absolute inset-0 bg-gradient-to-t from-neon-purple/20 to-transparent" />
        <div className="max-w-4xl mx-auto relative z-10 space-y-12">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-5xl md:text-8xl font-serif italic leading-tight"
          >
            Alguns livros você lê. <br />
            <span className="neon-text">Outros mudam você.</span>
          </motion.h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Não perca a oportunidade de ter em mãos as obras que estão redefinindo a poesia contemporânea.
          </p>
          <Button primary className="text-xl px-16 py-8 shadow-[0_0_50px_rgba(157,0,255,0.6)]">
            Comprar os livros de Marcos agora
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10 text-center space-y-8">
        <div className="text-3xl font-serif italic neon-text">Marcos</div>
        <div className="flex justify-center gap-8 text-xs font-display tracking-widest uppercase text-white/40">
          <a href="#" className="hover:text-white transition-colors">Termos</a>
          <a href="#" className="hover:text-white transition-colors">Privacidade</a>
          <a href="#" className="hover:text-white transition-colors">Contato</a>
        </div>
        <p className="text-[10px] text-white/20 uppercase tracking-widest">
          © 2026 Marcos Poesia. Todos os direitos reservados.
        </p>
      </footer>

    </div>
  );
}
