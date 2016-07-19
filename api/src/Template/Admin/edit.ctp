<div class="designs form large-10 medium-9 columns">
    <?= $this->Html->link(__('Retour à la Liste'), ['action' => 'index']) ?>

    <?= $this->Form->create($entity) ?>
    <fieldset>
        <legend><?= __('Edit') ?></legend>
        <?php
            foreach ($types as $name => $type){
                if(array_key_exists($name, $associations)){
                    echo $this->Form->input($associations[$name].'._ids', ['options' => $associationsList[$associations[$name]]]);
                } else {
                    echo $this->Form->input($name);
                }
            }
        ?>
    </fieldset>
    <?= $this->Form->button(__('Submit')) ?>
    <?= $this->Form->end() ?>
</div>
