# CW Bearing - Ball Bearing Solutions Website

A modern, multilingual Next.js website for CW Bearing, specializing in high-precision ball bearing solutions. This project provides an interactive configurator tool and comprehensive product information across multiple languages.

## 🌟 Features

- **Multilingual Support**: Full internationalization with 6 languages (German, English, US English, Italian, French, Polish)
- **Interactive Product Configurator**: 3-step process for finding and customizing ball bearing solutions
- **Responsive Design**: Mobile-first approach with Bootstrap 5
- **SEO Optimized**: Built with Next.js for optimal performance and SEO
- **Content Management**: Headless CMS integration for dynamic content
- **File Upload System**: Support for technical specifications and drawings
- **Google Tag Manager**: Analytics and tracking integration
- **Modern UI/UX**: Smooth animations with AOS (Animate On Scroll)

## 🚀 Tech Stack

- **Framework**: Next.js 15.4.4
- **React**: 19.1.1
- **Styling**: Bootstrap 5.2.3 + SCSS
- **Internationalization**: next-i18next
- **Forms**: Formik + Yup validation
- **HTTP Client**: Axios
- **Animations**: AOS (Animate On Scroll)
- **Carousel**: React Slick
- **Markdown**: React Markdown
- **Video**: React Player
- **Icons**: FontAwesome 5

## 📁 Project Structure

```
faf-cw-bearing/
├── public/                    # Static assets
│   ├── images/               # Image assets (PNG, SVG)
│   └── favicon_package/      # Favicon files
├── src/
│   ├── assets/               # Fonts and local assets
│   ├── components/           # Reusable React components
│   │   ├── Configurator/     # Product configurator
│   │   ├── Core/            # Basic UI components
│   │   ├── Header/          # Navigation components
│   │   ├── Footer/          # Footer component
│   │   ├── i18n/            # Internationalization
│   │   └── Layout/          # Main layout wrapper
│   ├── context/             # React context providers
│   ├── pages/               # Next.js pages
│   ├── scss/                # Stylesheets
│   ├── sections/            # Page sections/components
│   └── utils/               # Utility functions
├── next.config.js           # Next.js configuration
├── next-i18next.config.js   # i18n configuration
└── package.json             # Dependencies and scripts
```

## 🌍 Supported Languages

- **German (de)** - Default language
- **English (en)** - International English
- **US English (us)** - US-specific English
- **Italian (it)**
- **French (fr)**
- **Polish (pl)**

## 🛠️ Installation & Setup

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd faf-cw-bearing
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_API_URL=your_api_url_here
   ```

4. **Development Server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Build for Production**
   ```bash
   npm run build
   npm start
   # or
   yarn build
   yarn start
   ```

## 🔧 Configuration

### Next.js Configuration
The project uses custom Next.js configuration with:
- Image optimization via `next-optimized-images`
- Font optimization via `next-fonts`
- Internationalization routing
- Custom redirects for language domains

### Internationalization
- **Default locale**: German (de)
- **Domain routing**: Configured for `cwbearing.de` and `www.cwbearing.com`
- **Translation files**: Located in `src/components/i18n/locales/`

## 🎯 Key Components

### Product Configurator
The configurator is a 3-step process:

1. **Step 1**: Product search and selection
   - Base type selection
   - Bearing type specification
   - Dimension inputs (inner diameter, outer diameter, width)

2. **Step 2**: Product configuration
   - Detailed product customization
   - Price request preparation

3. **Step 3**: Request submission
   - Company and contact information
   - File upload for specifications/drawings
   - Privacy policy agreement

### Supported Bearing Types
- Single-row deep groove ball bearings
- Double-row deep groove ball bearings
- Single-row angular contact ball bearings
- Double-row angular contact ball bearings
- Four-point contact bearings

## 📱 Responsive Design

The website is fully responsive with:
- Mobile-first approach
- Bootstrap 5 grid system
- Custom breakpoints for different screen sizes
- Optimized images for various devices

## 🎨 Styling

- **SCSS**: Modular SCSS architecture
- **Bootstrap 5**: Component library
- **Custom Components**: Tailored styling for bearing industry
- **Animations**: Smooth scroll animations and transitions

## 🔍 SEO & Performance

- **Next.js**: Server-side rendering for better SEO
- **Image Optimization**: Automatic image optimization
- **Meta Tags**: Dynamic meta tag generation
- **Sitemap**: Automatic sitemap generation
- **Robots.txt**: Dynamic robots.txt generation

## 📊 Analytics

- **Google Tag Manager**: Integrated for analytics
- **GTM ID**: GTM-MFTBM4J
- **Event Tracking**: Custom event tracking for user interactions

## 🚀 Deployment

### Build Commands
```bash
# Development
npm run dev

# Production build
npm run build

# Start production server
npm start

# Export static files (if needed)
npm run export
```

### Environment Variables
- `NEXT_PUBLIC_API_URL`: API endpoint for content management

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary to CW Bearing.

## 🆘 Support

For technical support or questions about the codebase, please contact the development team.

---

**CW Bearing** - Where precision meets quality in ball bearing solutions.
