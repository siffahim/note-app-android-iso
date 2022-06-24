import { colors } from "../../theme/colors";
import { typography } from "../../theme/typography";

const BASE = {
    fontFamily: typography.primary,
    fontSize: 16,
    color: colors.black
}

const BASE_BOLD = {
    fontFamily: typography.primaryBold,
    fontSize: 16,
    color: colors.black
}

export const presets = {
    default: BASE,
    bold: BASE_BOLD,
    h1: {
        ...BASE_BOLD,
        fontSize: 32,
    },
    h2: {
        ...BASE_BOLD,
        fontSize: 28,
    },
    h3: {
        ...BASE_BOLD,
        fontSize: 24,
    },
    h4: {
        ...BASE_BOLD,
        fontSize: 16,
    },
    h5: {
        ...BASE,
        fontSize: 20,
    },
    small: {
        ...BASE,
        fontSize: 16,
    }
}
