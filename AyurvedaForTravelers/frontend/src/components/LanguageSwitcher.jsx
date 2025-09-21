import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
]

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false)
  const { i18n } = useTranslation()

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0]

  const handleLanguageChange = (languageCode) => {
    i18n.changeLanguage(languageCode)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors"
      >
        <span className="text-sm">{currentLanguage.flag}</span>
        <span className="text-sm font-medium">{currentLanguage.code.toUpperCase()}</span>
        <ChevronDown className="h-3 w-3 text-gray-500" />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
          <div className="py-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center space-x-2 ${
                  lang.code === i18n.language ? 'bg-emerald-50 text-emerald-700' : 'text-gray-700'
                }`}
              >
                <span>{lang.flag}</span>
                <span className="font-medium">{lang.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
