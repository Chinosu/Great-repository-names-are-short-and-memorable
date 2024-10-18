"use client"

import React from 'react';
import { styled } from '@mui/system';

interface BannerProps {
  imageUrl: string;
  title: string;
  subtitle?: string;  // Optional subtitle
}

const Banner: React.FC<BannerProps> = ({ imageUrl, title, subtitle }) => {
  return (
    <BannerContainer>
      <BannerImage src={imageUrl} alt="Event Banner" />
      <BannerText>
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </BannerText>
    </BannerContainer>
  );
};

// Styled components for the banner
const BannerContainer = styled('div')({
    position: 'relative',
    width: '100%',
    height: '600px',  // Adjust the height if needed
    overflow: 'hidden',
    padding: '0 60px',  // Horizontal padding for spacing
    borderBottomLeftRadius: '20px',
    borderBottomRightRadius: '20px',
    boxSizing: 'border-box',  // Ensure padding is included in width
  });

const BannerImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderBottomLeftRadius: '20px',  // Match the same radius here
  borderBottomRightRadius: '20px',  // Match the same radius here
});

const BannerText = styled('div')({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  color: '#fff',
  textAlign: 'center',
  fontSize: '2rem',
});

export default Banner;
