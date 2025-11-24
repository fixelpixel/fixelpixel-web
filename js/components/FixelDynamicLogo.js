import React, { useState, useEffect } from 'react';

/**
 * FixelDynamicLogo
 * Автономный компонент логотипа.
 * - Анимирует "Fixel Pixel" -> "FP" при скролле.
 * - Содержит фирменные фиолетовые скобки (#520260).
 * - Содержит "2.0" в степени (Emerald).
 * - Поддерживает светлую/темную тему через проп isDark.
 */

const LogoAnimator = ({ isScrolled, isDark }) => {
  const text = "Fixel Pixel";
  const letters = text.split('');
  
  // Логика задержки для эффекта "змейки" (последовательное исчезновение/появление)
  const getDelay = (index) => {
    if (isScrolled) {
      // При сворачивании: буквы исчезают справа налево к центрам (F и P)
      if (index >= 1 && index <= 5) return `${(5 - index) * 50}ms`;
      if (index >= 7 && index <= 10) return `${(10 - index) * 50}ms`;
    } else {
      // При разворачивании: буквы появляются от центров наружу
      if (index >= 1 && index <= 5) return `${(index - 1) * 50}ms`;
      if (index >= 7 && index <= 10) return `${(index - 7) * 50}ms`;
    }
    return '0ms';
  };

  return (
    // Контейнер текста: выравнивание и размер
    <div className="flex items-center font-bold tracking-tight text-2xl h-9 pb-1">
      {letters.map((char, i) => (
        <span 
          key={i}
          // Базовые стили букв + переходы
          className={`inline-block transition-all duration-500 ease-in-out whitespace-pre ${isDark ? "text-white" : "text-slate-900"}`}
          style={{
            // Индексы 0 (F) и 6 (P) остаются всегда
            // Остальные схлопываются в ширину 0 и прозрачность 0
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

  // Слушатель скролла для триггера анимации
  useEffect(() => {
    const handleScroll = () => {
      // Анимация срабатывает при скролле > 10px
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    // Триггер при монтировании на случай, если страница уже прокручена
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Стиль скобок: Фирменный цвет + небольшая тень для читаемости в Dark Mode
  const bracketStyle = {
    color: '#520260',
    textShadow: isDark ? '0 0 15px rgba(82, 2, 96, 0.8), 0 0 2px rgba(255,255,255,0.3)' : 'none'
  };

  return (
    <div className="flex items-center cursor-pointer group select-none h-full">
      {/* Левая скобка */}
      <span 
        className="text-3xl font-bold mr-1.5 pb-1 transition-all duration-300" 
        style={bracketStyle}
      >
        {`{`}
      </span>
      
      {/* Анимированный текст */}
      <LogoAnimator isScrolled={isScrolled} isDark={isDark} />
      
      {/* Правая часть: Скобка + Степень 2.0 */}
      <div className="relative flex items-center">
        <span 
          className="text-3xl font-bold ml-1.5 pb-1 transition-all duration-300" 
          style={bracketStyle}
        >
          {`}`}
        </span>
        
        {/* Superscript 2.0 */}
        <span 
          className={`absolute -top-1 -right-6 text-[10px] font-extrabold font-mono tracking-tighter transition-colors duration-300 ${isDark ? "text-emerald-400" : "text-emerald-600"}`}
        >
          2.0
        </span>
      </div>
    </div>
  );
};
