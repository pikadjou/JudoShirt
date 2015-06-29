<div class="actions columns large-2 medium-3">
    <h3><?= __('Actions') ?></h3>
    <ul class="side-nav">
        <li><?= $this->Html->link(__('List Promotions'), ['action' => 'index']) ?></li>
    </ul>
</div>
<div class="promotions form large-10 medium-9 columns">
    <?= $this->Form->create($promotion) ?>
    <fieldset>
        <legend><?= __('Add Promotion') ?></legend>
        <?php
            echo $this->Form->input('name');
            echo $this->Form->input('image');
            echo $this->Form->input('startDate', array('empty' => true, 'default' => ''));
            echo $this->Form->input('endDate', array('empty' => true, 'default' => ''));
        ?>
    </fieldset>
    <?= $this->Form->button(__('Submit')) ?>
    <?= $this->Form->end() ?>
</div>
