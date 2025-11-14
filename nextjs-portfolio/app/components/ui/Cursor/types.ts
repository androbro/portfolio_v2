export interface CursorProps {
	/**
	 * Size of the cursor in pixels
	 */
	size?: number;

	/**
	 * Color of the cursor (CSS value)
	 */
	color?: string;

	/**
	 * CSS mix-blend-mode property
	 * Common values: 'normal', 'multiply', 'screen', 'overlay', 'darken',
	 * 'lighten', 'color-dodge', 'color-burn', 'hard-light', 'soft-light',
	 * 'difference', 'exclusion', 'hue', 'saturation', 'color', 'luminosity'
	 */
	mixBlendMode?: string;

	/**
	 * Z-index of the cursor
	 */
	zIndex?: number;
}
