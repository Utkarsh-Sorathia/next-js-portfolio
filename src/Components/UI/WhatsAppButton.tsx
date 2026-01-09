'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import Strings from '@/constants/strings';
import styles from '@/app/whatsapp.module.css';

const WhatsAppButton = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const showScrollTop = scrollY > 400;

  return (
    <Link 
      href={Strings.primarywhatsappLink} 
      target="_blank" 
      rel="noopener noreferrer" 
      className={styles.whatsappSticky} 
      style={{ 
        bottom: showScrollTop ? '76px' : undefined
      }}
    >
      <FontAwesomeIcon icon={faWhatsapp} style={{ width: '1.5rem', height: '1.5rem' }} />
    </Link>
  );
};

export default WhatsAppButton;
