<?php
namespace Application\Theme\HinnavaruBlue;

use Concrete\Core\Page\Theme\Theme;

class PageTheme extends Theme
{
    public function getThemeName()
    {
        return t('Hinnavaru Blue');
    }

    public function getThemeDescription()
    {
        return t('Official mission-aligned theme for the Hinnavaru Blue Initiative.');
    }

    public function registerAssets()
    {
        $this->requireAsset('javascript', 'jquery');
        $this->providesAsset('css', 'typography');
    }
}
