<?php
/**
 * CakePHP(tm) : Rapid Development Framework (http://cakephp.org)
 * Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 *
 * Licensed under The MIT License
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 * @link          http://cakephp.org CakePHP(tm) Project
 * @since         0.10.0
 * @license       http://www.opensource.org/licenses/mit-license.php MIT License
 */

$cakeDescription = 'CakePHP: the rapid development php framework';
?>
<!DOCTYPE html>
<html>
<head>
    <?= $this->Html->charset() ?>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>
        <?= $cakeDescription ?>:
        <?= $this->fetch('title') ?>
    </title>
    <?= $this->Html->meta('icon') ?>

    <?= $this->Html->css('base.css') ?>
    <?= $this->Html->css('cake.css') ?>

    <?= $this->fetch('meta') ?>
    <?= $this->fetch('css') ?>
    <?= $this->fetch('script') ?>
</head>
<body>
    <header>
        <div class="header-title">
            <span><?= $this->fetch('title') ?></span>
        </div>
        <div class="header-help">
            <span><a target="_blank" href="http://book.cakephp.org/3.0/">Documentation</a></span>
            <span><a target="_blank" href="http://api.cakephp.org/3.0/">API</a></span>
        </div>
    </header>
    <div id="container">

        <div id="content">
            <?= $this->Flash->render() ?>

            <div class="row">
                <div class="actions columns large-2 medium-3">
                    <h3><?= __('Actions') ?></h3>
                    <ul class="side-nav">
                        <li>
                            Articles
                            <ul>
                                <li><?= $this->Html->link(__('List'), ['controller' => 'Articles', 'action' => 'index']) ?> </li>
                                <li><?= $this->Html->link(__('New'), ['controller' => 'Articles', 'action' => 'add']) ?> </li>
                            </ul>
                        </li>
                        <li>
                            Products
                            <ul>
                                <li><?= $this->Html->link(__('List'), ['controller' => 'Products', 'action' => 'index']) ?> </li>
                                <li><?= $this->Html->link(__('New'), ['controller' => 'Products', 'action' => 'add']) ?> </li>
                            </ul>
                        </li>
                        <li>
                            Categories
                            <ul>
                                <li><?= $this->Html->link(__('List'), ['controller' => 'Categories', 'action' => 'index']) ?> </li>
                                <li><?= $this->Html->link(__('New'), ['controller' => 'Categories', 'action' => 'add']) ?> </li>
                            </ul>
                        </li>
                        <li>
                            Designs
                            <ul>
                                <li><?= $this->Html->link(__('List'), ['controller' => 'Designs', 'action' => 'index']) ?> </li>
                                <li><?= $this->Html->link(__('New'), ['controller' => 'Designs', 'action' => 'add']) ?> </li>
                            </ul>
                        </li>
                        <li>
                            Impressions
                            <ul>
                                <li><?= $this->Html->link(__('List'), ['controller' => 'prints', 'action' => 'index']) ?> </li>
                                <li><?= $this->Html->link(__('New'), ['controller' => 'prints', 'action' => 'add']) ?> </li>
                            </ul>
                        </li>
                        <li>
                            Appearances
                            <ul>
                                <li><?= $this->Html->link(__('List'), ['controller' => 'Appearances', 'action' => 'index']) ?> </li>
                                <li><?= $this->Html->link(__('New'), ['controller' => 'Appearances', 'action' => 'add']) ?> </li>
                            </ul>
                        </li>
                        <li>
                            Sizes
                            <ul>
                                <li><?= $this->Html->link(__('List'), ['controller' => 'Sizes', 'action' => 'index']) ?> </li>
                                <li><?= $this->Html->link(__('New'), ['controller' => 'Sizes', 'action' => 'add']) ?> </li>
                            </ul>
                        </li>
                        <li>
                            Cms
                            <ul>
                                <li><?= $this->Html->link(__('List'), ['controller' => 'cms', 'action' => 'index']) ?> </li>
                                <li><?= $this->Html->link(__('New'), ['controller' => 'cms', 'action' => 'add']) ?> </li>
                            </ul>
                        </li>
                        <li>
                            Configurations
                            <ul>
                                <li><?= $this->Html->link(__('List'), ['controller' => 'Configs', 'action' => 'index']) ?> </li>
                                <li><?= $this->Html->link(__('New'), ['controller' => 'Configs', 'action' => 'add']) ?> </li>
                            </ul>
                        </li>
                    </ul>
                </div>

                <?= $this->fetch('content') ?>
            </div>
        </div>
        <footer>
        </footer>
    </div>
</body>
</html>
