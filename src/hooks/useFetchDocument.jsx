import { useState, useEffect } from "react";
import { database } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";

export const useFetchDocument = (docCollection, id) => {
  const [document, setDocument] = useState([]);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    async function loadDocument() {
      if (cancelled) return;

      setLoading(true);

      try {
        const docRef = await doc(database, docCollection, id);
        const docSnap = await getDoc(docRef);

        setDocument(docSnap.data());
      } catch (error) {
        console.log(error);
        setError(error.message);

        setLoading(false);
      }
    }
    loadDocument();
  }, [docCollection, id]);

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { document, loading, error };
};
