import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export const useCardQuery = (scryfallQuery: string) => {

  const queryKey = ["cards"]

  const getCards = async () => {
    return await axios.get(`https://api.scryfall.com/cards/search?q=${scryfallQuery}`).then((res) => res.data)
  }

  const query = useQuery({ queryKey: [...queryKey, scryfallQuery], queryFn: getCards, enabled: Boolean(scryfallQuery) })

  return { query }
}
