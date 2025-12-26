import { urlBackend } from '../utils/baseUrl';

export async function getAllMessages() {
  const res = await fetch(`${urlBackend}/chat/all`, {
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch messages');
  }
  return res.json();
}

export async function getMessagesByContact(contactId: string) {
  const res = await fetch(`${urlBackend}/api/chat/messages/${contactId}`, {
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch messages');
  }
  return res.json();
}

export async function sendMessage(contactId: string, formData: FormData) {
  const res = await fetch(`${urlBackend}/api/chat/send/${contactId}`, {
    method: 'POST',
    credentials: 'include',
    body: formData,
  });

  if (!res.ok) {
    throw new Error('Failed to send message');
  }
  return res.json().then((response) => response.data);
}

//PATCH
export async function updateMessage(messageId: string, formData: FormData) {
  const res = await fetch(`${urlBackend}/api/chat/messages/${messageId}`, {
    method: 'PATCH',
    credentials: 'include',
    body: formData,
  });

  if (!res.ok) {
    throw new Error('Failed to update message');
  }
  return res.json();
}
//DELETE
export async function deleteMessage(messageId: string) {
  const response = await fetch(`${urlBackend}/api/chat/messages/${messageId}`, {
    method: 'DELETE',
    credentials: 'include',
  });

  if (!response.ok) {
    const error = await response.json();
    return { error: error.message || 'Delete message failed' };
  }
  return true;
}
