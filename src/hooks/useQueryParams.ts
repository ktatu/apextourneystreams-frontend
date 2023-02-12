import { useSearchParams } from "react-router-dom"

const useQueryParams = (key: string) => {
    const [searchParams, setSearchParams] = useSearchParams()

    const addValue = (value: string) => {
        const newParams = searchParams

        if (!newParams.getAll(key).includes(value)) {
            newParams.append(key, value)
            setSearchParams(newParams.toString())
        }
    }

    const getValues = (): string[] => {
        const values = searchParams.getAll("channel")

        return values
    }

    const removeValue = (valueToRemove: string) => {
        const params = searchParams
        let valuesInSearchParams = params.getAll(key)

        valuesInSearchParams = valuesInSearchParams.filter(
            (valueInParams) => valueInParams !== valueToRemove
        )
        params.delete(key)
        valuesInSearchParams.forEach((value) => params.append(key, value))

        setSearchParams(params.toString())
    }

    return {
        addValue,
        getValues,
        removeValue,
    }
}

export default useQueryParams
