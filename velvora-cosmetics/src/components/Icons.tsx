import type { IconBaseProps } from 'react-icons'
import {
  FiArrowLeft,
  FiArrowRight,
  FiCheck,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiClock,
  FiHeadphones,
  FiHeart,
  FiMail,
  FiMapPin,
  FiMenu,
  FiMinus,
  FiPhone,
  FiPlus,
  FiSearch,
  FiShield,
  FiShoppingBag,
  FiTrash2,
  FiTruck,
  FiUser,
  FiX,
} from 'react-icons/fi'
import { FaFacebookF, FaHeart, FaInstagram, FaPlay, FaWhatsapp, FaYoutube } from 'react-icons/fa6'
import { FaShippingFast } from 'react-icons/fa'
import { LuLeaf, LuPanelLeftClose, LuPanelLeftOpen } from 'react-icons/lu'
import { LuDroplet, LuEye, LuFlaskConical, LuPackageOpen, LuPalette, LuSearch, LuSlidersHorizontal, LuSmile, LuSparkles, LuWind } from 'react-icons/lu'
import type { CategorySlug } from '../catalog/types'

export const CATEGORY_ICONS: Record<CategorySlug, typeof LuLeaf> = {
  skincare: LuDroplet,
  lips: LuSmile,
  hair: LuWind,
  eye: LuEye,
  makeup: LuPalette,
  fragrance: LuFlaskConical,
}
export { LuSearch as SearchLensIcon, LuSlidersHorizontal as FilterIcon, LuPackageOpen as EmptyBoxIcon, LuSparkles as SparkleIcon, LuPanelLeftClose as SidebarCloseIcon, LuPanelLeftOpen as SidebarOpenIcon }

// Every icon in the app comes from React Icons; this file only gives them semantic names.
export {
  FiArrowLeft as ArrowLeft,
  FiArrowRight as ArrowRight,
  FiCheck as CheckIcon,
  FiChevronDown as ChevronDown,
  FiChevronLeft as ChevronLeft,
  FiChevronRight as ChevronRight,
  FiClock as ClockIcon,
  FiHeadphones as SupportIcon,
  FiMail as MailIcon,
  FiMapPin as PinIcon,
  FiMenu as MenuIcon,
  FiMinus as MinusIcon,
  FiPhone as PhoneIcon,
  FiPlus as PlusIcon,
  FiSearch as SearchIcon,
  FiShield as ShieldIcon,
  FiShoppingBag as BagIcon,
  FiTrash2 as TrashIcon,
  FiTruck as TruckIcon,
  FiUser as UserIcon,
  FiX as CloseIcon,
  FaFacebookF as FacebookIcon,
  FaShippingFast as ShippingFastIcon,
  FaInstagram as InstagramIcon,
  FaWhatsapp as WhatsappIcon,
  FaYoutube as YoutubeIcon,
  FaPlay as PlayIcon,
  LuLeaf as LeafIcon,
}

export const HeartIcon = ({ filled, ...props }: IconBaseProps & { filled?: boolean }) =>
  filled ? <FaHeart {...props} /> : <FiHeart {...props} />
