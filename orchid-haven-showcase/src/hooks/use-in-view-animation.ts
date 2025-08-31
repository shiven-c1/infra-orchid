import { useEffect, useRef, useState } from "react";

// Lightweight hook for in-view detection. To avoid blank/white screen issues
// this defaults to "true" on mount and only toggles when IntersectionObserver
// clearly reports the element is not visible. Consumers can use the ref and
// the `inView` boolean to apply subtle animations.
export function useInViewAnimation<T extends HTMLElement>() {
	const ref = useRef<T | null>(null);
	const [inView, setInView] = useState<boolean>(true);

	useEffect(() => {
		const el = ref.current;
		if (!el || typeof IntersectionObserver === "undefined") return;

		const obs = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					setInView(entry.isIntersecting);
				});
			},
			{ threshold: 0.1 }
		);

		obs.observe(el);

		return () => obs.disconnect();
	}, []);

	// Return a tuple so callers that do array destructuring receive [ref, inView]
	return [ref, inView] as const;
}

export default useInViewAnimation;
