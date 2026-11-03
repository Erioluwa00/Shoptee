import { useShop } from '../context/ShopContext'

export default function Toast() {
  const { toast } = useShop()
  return (
    <div className={`toast ${toast ? 'show' : ''}`} role="status" aria-live="polite">
      {toast}
    </div>
  )
}
