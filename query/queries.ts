import axiosPublic from "@/utils/axiosPublic"

export async function queryAPI(param: string) {
    return await axiosPublic.get(param)
}
