import { Vendor } from "./types"

export function matchVendors(project: any, vendors: Vendor[]) {
  return vendors
    .map((vendor) => {
      let score = 0
      const reasons: string[] = []

      // 🎯 CATEGORY (must-have)
      if (vendor.category === project.category) {
        score += 30
        reasons.push("Specjalizuje się w tym typie projektu")
      }

      // 🎬 STYLE (najważniejsze)
      if (vendor.styles.includes(project.style)) {
        score += 40
        reasons.push("Pasuje do wybranego stylu")
      } else if (vendor.styles.length > 1) {
        score += 15
        reasons.push("Ma zbliżony styl")
      }

      // 💰 BUDGET
      if (vendor.priceRange === project.budget) {
        score += 20
        reasons.push("Mieści się w Twoim budżecie")
      } else {
        score += 5
      }

      // 📍 LOCATION
      if (vendor.location === project.location) {
        score += 10
        reasons.push("Działa w Twojej lokalizacji")
      }

      const percentage = Math.min(100, Math.round(score))

      return {
        ...vendor,
        score,
        percentage,
        reasons,
      }
    })
    .sort((a, b) => b.score - a.score)
}

export function getTopMatches(project: any, vendors: Vendor[]) {
  return matchVendors(project, vendors)
}