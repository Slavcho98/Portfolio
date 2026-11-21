import { useEffect, useRef } from 'react'
import { MotionConfig } from 'motion/react'
import { CartProvider } from './cart/CartContext'
import { CatalogProvider } from './catalog/CatalogContext'
import CartDrawer from './components/CartDrawer'
import CartPage from './components/CartPage'
import CheckoutPage from './components/CheckoutPage'
import Categories from './components/Categories'
import Collections from './components/Collections'
import ConfirmSheet from './components/ConfirmSheet'
import Discounts from './components/Discounts'
import Footer from './components/Footer'
import Header from './components/Header'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import OrderPage from './components/OrderPage'
import ScrollProgress from './components/ScrollProgress'
import Seo from './components/Seo'
import ShopPage from './components/ShopPage'
import ProductPage from './components/ProductPage'
import Toast from './components/Toast'
import TopProducts from './components/TopProducts'
import VideoBanner from './components/VideoBanner'
import WishlistDrawer from './components/WishlistDrawer'
import { useHashRoute, type Route } from './hooks/useHashRoute'
import { SITE_URL } from './seo'
import { UiProvider, useUi } from './ui/UiContext'
import { WishlistProvider } from './wishlist/WishlistContext'

function Shell() {
  const { route, hash, params, slug } = useHashRoute()
  const { close, closeConfirm } = useUi()
  const previousRoute = useRef<Route | null>(null)

  // Hash links can point at sections that only exist on the home view, so scroll after the route renders.
  useEffect(() => {
    close()
    closeConfirm()
    const routeChanged = previousRoute.current !== route
    previousRoute.current = route

    if (route === 'cart' || route === 'product' || route === 'checkout' || route === 'order') {
      window.scrollTo(0, 0)
      return
    }
    if (route === 'shop') {
      // Changing a filter keeps the scroll position; arriving from another page starts at the top.
      if (routeChanged) window.scrollTo(0, 0)
      return
    }
    const id = hash.slice(1)
    requestAnimationFrame(() => {
      const target = id ? document.getElementById(id) : null
      if (target) target.scrollIntoView()
      else window.scrollTo(0, 0)
    })
  }, [route, hash, close, closeConfirm])

  return (
    <>
      <ScrollProgress />
      <Header />
      <main>
        {route === 'cart' ? (
          <CartPage />
        ) : route === 'checkout' ? (
          <CheckoutPage />
        ) : route === 'order' ? (
          <OrderPage key={slug} orderNumber={slug} />
        ) : route === 'shop' ? (
          <ShopPage params={params} />
        ) : route === 'product' ? (
          <ProductPage key={slug} slug={slug} />
        ) : (
          <>
            <Seo
              path="#/"
              jsonLd={[
                { '@context': 'https://schema.org', '@type': 'Organization', name: 'Velvora', url: SITE_URL, logo: `${SITE_URL}/favicon.svg` },
                {
                  '@context': 'https://schema.org',
                  '@type': 'WebSite',
                  name: 'Velvora',
                  url: SITE_URL,
                  potentialAction: { '@type': 'SearchAction', target: `${SITE_URL}/#/shop?q={search_term_string}`, 'query-input': 'required name=search_term_string' },
                },
              ]}
            />
            <Hero />
            <Categories />
            <TopProducts />
            <VideoBanner />
            <Discounts />
            <Marquee />
            <Collections />
          </>
        )}
      </main>
      <Footer />
      <CartDrawer />
      <WishlistDrawer />
      <ConfirmSheet />
      <Toast />
    </>
  )
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <CatalogProvider>
        <UiProvider>
          <WishlistProvider>
            <CartProvider>
              <Shell />
            </CartProvider>
          </WishlistProvider>
        </UiProvider>
      </CatalogProvider>
    </MotionConfig>
  )
}
