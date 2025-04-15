import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'outlined' | 'elevated';
}

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> & {
  Title: React.FC<CardTitleProps>;
  Content: React.FC<CardContentProps>;
  Footer: React.FC<CardFooterProps>;
} = ({ children, className = '', variant = 'default' }) => {
  let cardClasses = 'rounded-lg overflow-hidden';

  switch (variant) {
    case 'outlined':
      cardClasses += ' border border-gray-200 bg-white';
      break;
    case 'elevated':
      cardClasses += ' shadow-md bg-white';
      break;
    default:
      cardClasses += ' bg-white shadow';
      break;
  }

  return (
    <div className={`${cardClasses} ${className}`}>
      {children}
    </div>
  );
};

const CardTitle: React.FC<CardTitleProps> = ({ children, className = '' }) => {
  return (
    <div className={`px-6 py-4 border-b border-gray-200 ${className}`}>
      <h3 className="text-lg font-medium text-gray-900">{children}</h3>
    </div>
  );
};

const CardContent: React.FC<CardContentProps> = ({ children, className = '' }) => {
  return (
    <div className={`px-6 py-4 ${className}`}>
      {children}
    </div>
  );
};

const CardFooter: React.FC<CardFooterProps> = ({ children, className = '' }) => {
  return (
    <div className={`px-6 py-4 border-t border-gray-200 bg-gray-50 ${className}`}>
      {children}
    </div>
  );
};

Card.Title = CardTitle;
Card.Content = CardContent;
Card.Footer = CardFooter;

export default Card; 