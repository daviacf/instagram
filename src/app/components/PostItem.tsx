'use client';

import { useState, useEffect } from 'react';
import { HeartIcon as HeartOutline } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';
import { BookmarkIcon as Bookmark } from '@heroicons/react/24/outline';
import { ChatBubbleOvalLeftIcon as Chatbubble } from '@heroicons/react/24/outline';
import { PaperAirplaneIcon as PaperAirplane } from '@heroicons/react/24/outline';

interface Post {
  id: number;
  username: string;
  avatarUrl: string;
  imageUrl: string;
  numberOfLikes: number;
  description: string;
}

interface PostItemProps {
  post: Post;
}

export default function PostItem({ post }: PostItemProps) {
  const [liked, setLiked] = useState(false);
  const [fact, setFact] = useState<string>('Carregando...');

  const toggleLike = () => setLiked(!liked);

  useEffect(() => {
    fetch('https://meowfacts.herokuapp.com/')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.data) {
          setFact(data.data[0]);
        } else {
          setFact('Fato não disponível.');
        }
      })
      .catch(() => {
        setFact('Erro ao carregar o fato.');
      });
  }, []);

  return (
    <div className="max-w-md mx-auto my-4 bg-white shadow">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
  {/* Avatar + Nome */}
  <div className="flex items-center">
    <img
      src={post.avatarUrl}
      alt={post.username}
      className="w-10 h-10 rounded-full mr-3"
    />
    <span className="font-semibold">{post.username}</span>
  </div>

  {/* Botão de seguir + menu */}
  <div className="flex items-center gap-2">
    <button className="text-blue-500 text-sm font-semibold px-3 py-1 rounded hover:bg-blue-100 transition">Follow</button>
    <button
      className="text-gray-500 hover:text-black p-1 rounded-full transition-colors duration-200"
      aria-label="Mais opções"
    >
      <svg
        className="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <circle cx="5" cy="12" r="2" />
        <circle cx="12" cy="12" r="2" />
        <circle cx="19" cy="12" r="2" />
      </svg>
    </button>
  </div>
</div>


      {/* Image */}
      <img src={post.imageUrl} alt="Post" className="w-full p-4" />

      {/* Footer */}
      <div className="p-4">
        {/* Linha de ícones de interação */}
        <div className="flex justify-between items-center mb-2">
          <div className="flex space-x-4">
            <button onClick={toggleLike}>
              {liked ? (
                <HeartSolid className="h-6 w-6 text-red-500 cursor-pointer" />
              ) : (
                <HeartOutline className="h-6 w-6 text-gray-700 cursor-pointer" />
              )}
            </button>
            <Chatbubble className="h-6 w-6 text-gray-700" />
            <PaperAirplane className="h-6 w-6 text-gray-700 -rotate-45" />
          </div>
          <Bookmark className="h-6 w-6 text-gray-700" />
        </div>

        <p className="text-sm text-gray-800">
          <strong>{post.numberOfLikes + (liked ? 1 : 0)} curtidas</strong>
        </p>
        <p className="text-sm">
          <strong>{post.username}</strong> {fact}
        </p>
      </div>
    </div>
  );
}
