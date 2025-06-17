'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null);
    setStatus('idle'); // reset
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    setStatus('uploading');

    try {
      const res = await fetch('https://back.firststep-app.com/api/test', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Upload failed');
      setStatus('success');
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 p-6">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="bg-white/70 backdrop-blur-md shadow-xl rounded-2xl p-8 w-full max-w-md text-center border border-white/30"
      >
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold text-purple-700 mb-4"
        >
          Upload Your test File 🐣
        </motion.h1>

        <input
          type="file"
          onChange={handleFileChange}
          className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold
                     file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 w-full mb-6"
        />

        <button
          type="submit"
          className="bg-purple-600 text-white py-2 px-6 rounded-full shadow-md hover:bg-purple-700 transition duration-300"
        >
          {status === 'uploading' ? 'Uploading...' : 'Submit'}
        </button>

        <AnimatePresence>
          {status === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="mt-6 text-green-600 font-semibold text-sm"
            >
              🎉 File uploaded successfully!
            </motion.div>
          )}
          {status === 'error' && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="mt-6 text-red-500 font-semibold text-sm"
            >
              ❌ Oops! Upload failed. Try again.
            </motion.div>
          )}
        </AnimatePresence>
      </motion.form>
    </div>
  );
}
