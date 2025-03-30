import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const isDarkMode = ref<boolean>(false)

  const toggleTheme = () => {
    isDarkMode.value = !isDarkMode.value
    saveTheme()
    updateHtmlClass()
  }

  const updateHtmlClass = () => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const loadTheme = () => {
    const theme = localStorage.theme
    isDarkMode.value = theme ? theme === 'dark' : false
    updateHtmlClass()
  }

  const saveTheme = () => {
    localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light')
  }

  return { isDarkMode, toggleTheme, loadTheme, saveTheme }
})
