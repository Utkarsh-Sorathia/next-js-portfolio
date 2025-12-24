import PageBox from '@/Components/core/PageBox';
import ResponsiveBox from '@/Components/core/ResponsiveBox';
import ConstrainedBox from '@/Components/core/constrained-box';
import SectionTitle from '@/Components/common/SectionTitle';

export default function Loading() {
  return (
    <PageBox>
      <ResponsiveBox
        classNames="min-h-screen items-center justify-center lg:px-40"
        id="blogs"
      >
        <ConstrainedBox classNames="px-4 py-16">
          {/* Header Section */}
          <div className="mb-8 sm:mb-12 lg:mb-16">
            <SectionTitle>My <span className="text-[var(--primaryColor)]">Blogs</span></SectionTitle>
            <p className="text-center text-base sm:text-lg text-[var(--textColorLight)] max-w-2xl mx-auto mt-4 sm:mt-6">
              Thoughts, tutorials, and insights about web development, technology, and programming.
            </p>
          </div>

          {/* Loading Text with Animated Dots */}
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-white text-2xl sm:text-3xl md:text-4xl font-semibold">
              Loading Blogs
              <span className="loading-dots">
                <span className="dot dot-1">.</span>
                <span className="dot dot-2">.</span>
                <span className="dot dot-3">.</span>
              </span>
            </div>
          </div>
        </ConstrainedBox>
      </ResponsiveBox>
    </PageBox>
  );
}

