import { redirect } from 'next/navigation'

interface PlaylistProps {
  params: Promise<{ id: string }>
}

export default async function Playlist({ params }: PlaylistProps) {
  const { id } = await params
  redirect(`/shorts/${id}`)
}
