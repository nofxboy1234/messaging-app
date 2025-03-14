import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Picture from '../../pages/Profile/Picture';

describe('Picture', () => {
  it('should render an image representing a user profile picture', () => {
    const src = '';
    const scale = 1;
    render(<Picture src={src} scale={scale} />);

    const image = screen.getByRole('img', { name: 'Profile picture' });
    expect(image).toBeInTheDocument();
  });

  it('should render an image using the src prop', () => {
    const src = 'https://example.com/pictures/user1';
    const scale = 1;
    render(<Picture src={src} scale={scale} />);

    const image = screen.getByRole('img', { name: 'Profile picture' });
    expect(image.getAttribute('src')).toBe(
      'https://example.com/pictures/user1',
    );
  });

  describe('when the scale is 1', () => {
    it('should render a 40 x 40 image with width: "40px", height: "40px"', () => {
      const src = './mock_profile_picture';
      const scale = 1;
      render(<Picture src={src} scale={scale} />);

      const image = screen.getByRole('img', { name: 'Profile picture' });
      expect(image.getAttribute('width')).toBe('40px');
      expect(image.getAttribute('height')).toBe('40px');
    });
  });

  describe('when the scale is 0.5', () => {
    it('should render a 40 x 40 image with width: "20px", height: "20px"', () => {
      const src = './mock_profile_picture';
      const scale = 0.5;
      render(<Picture src={src} scale={scale} />);

      const image = screen.getByRole('img', { name: 'Profile picture' });
      expect(image.getAttribute('width')).toBe('20px');
      expect(image.getAttribute('height')).toBe('20px');
    });
  });
});
