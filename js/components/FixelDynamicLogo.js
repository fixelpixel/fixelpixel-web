import React, { useState, useEffect } from 'react';

const LogoAnimator = ({ isScrolled, isDark, colorMode }) => {
  const text = "Fixel Pixel";
  const letters = text.split('');
  
  const getDelay = (index) => {
    if (isScrolled) {
      if (index >= 1 && index <= 5) return `${(5 - index) * 50}ms`;
      if (index >= 7 && index <= 10) return `${(10 - index) * 50}ms`;
    } else {
      if (index >= 1 && index <= 5) return `${(index - 1) * 50}ms`;
      if (index >= 7 && index <= 10) return `${(index - 7) * 50}ms`;
    }
    return '0ms';
  };

  return (
    <div className="flex items-center font-black tracking-tighter text-2xl h-9 pb-1">
      {letters.map((char, i) => (
        <span 
          key={i}
          className={`inline-block transition-all duration-500 ease-in-out whitespace-pre ${
            isDark ? "text-white" : "text-slate-900"
          }`}
          style={{
            // Фикс слипания FP
            ...(i === 6 && isScrolled ? { marginLeft: '2px' } : { marginLeft: '0px' }),
            ...((i !== 0 && i !== 6) ? { 
              maxWidth: isScrolled ? '0px' : '20px', 
              opacity: isScrolled ? 0 : 1,
              transform: isScrolled ? 'translateX(-5px)' : 'translateX(0)',
              transitionDelay: getDelay(i)
            } : {})
          }}
        >
          {char}
        </span>
      ))}
    </div>
  );
};

export const FixelDynamicLogo = ({ isDark = true }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  // НАСТРОЙКА ЦВЕТА ЗДЕСЬ
  // 'unified' = один цвет (Фиолетовый) - максимально строго
  // 'indigo'  = один цвет (Индиго) - под цвет сайта
  // 'soft'    = мягкий градиент (Фиолетовый -> Синий)
  const variant = 'unified'; 

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Определяем классы в зависимости от варианта
  const getBracketColors = () => {
    switch(variant) {
      case 'unified': // Чистый Фиолетовый (Твой любимый)
        return {
          left: isDark ? "text-violet-500" : "text-violet-600",
          right: isDark ? "text-violet-500" : "text-violet-600",
          shadow: isDark ? "drop-shadow-[0_0_10px_rgba(139,92,246,0.5)]" : ""
        };
      case 'indigo': // Чистый Индиго (Под цвет сайта)
        return {
          left: isDark ? "text-indigo-500" : "text-indigo-600",
          right: isDark ? "text-indigo-500" : "text-indigo-600",
          shadow: isDark ? "drop-shadow-[0_0_10px_rgba(99,102,241,0.5)]" : ""
        };
      case 'soft': // Мягкий перелив (Соседи)
        return {
          left: isDark ? "text-violet-500" : "text-violet-600",
          right: isDark ? "text-indigo-500" : "text-indigo-600",
          shadow: ""
        };
      default:
        return { left: "text-white", right: "text-white", shadow: "" };
    }
  };

  const colors = getBracketColors();

  return (
    <div className="flex items-center cursor-pointer group select-none h-full">
      {/* Левая скобка */}
      <span 
        className={`text-3xl font-bold mr-1 pb-1 transition-all duration-300 group-hover:-translate-x-1 ${colors.left} ${colors.shadow}`}
      >
        {`{`}
      </span>
      
      {/* Текст */}
      <LogoAnimator isScrolled={isScrolled} isDark={isDark} />
      
      {/* Правая часть */}
      <div className="relative flex items-center">
        <span 
          className={`text-3xl font-bold ml-1 pb-1 transition-all duration-300 group-hover:translate-x-1 ${colors.right} ${colors.shadow}`}
        >
          {`}`}
        </span>
        
        {/* 2.0 - Оставляем Изумрудным как акцент денег, или делаем серым */}
        <span 
          className={`absolute -top-1 -right-6 text-[10px] font-extrabold font-mono tracking-tighter transition-colors duration-300 ${
            isDark ? "text-slate-500" : "text-slate-400"
          }`}
        >
          2.0
        </span>
      </div>
    </div>
  );
};