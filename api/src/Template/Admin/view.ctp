<div class="categories view large-10 medium-9 columns">
    <h2><?= h($data->name) ?></h2>
    <div>
        <?= $this->Html->link(__('Retour à la Liste'), ['action' => 'index']) ?>

        <?= $this->Html->link(__('Edit'), ['action' => 'edit', $data->id]) ?>
        <?= $this->Form->postLink(__('Delete'), ['action' => 'delete', $data->id], ['confirm' => __('Are you sure you want to delete # {0}?', $data->id)]) ?>
    </div>

    <div class="row">
        <?php foreach ($types as $name => $type): ?>
            <div class="large-3 columns 
                <?php 
                    switch ($type):
                        case "integer": ?>
                           numbers
                            <?php break;
                        case "string": ?>
                           strings
                            <?php break;
                        case "text": ?>
                           texts
                            <?php break;
                        default: break;
                    endswitch; ?>
            ">
                <h6 class="subheader"><?= __($name) ?></h6>
                <p>
                    <?php 
                    switch ($type){
                        case "boolean": ?>
                            <input type="checkbox" <?php echo ($data->$name == 1) ? 'checked' : '' ?> disabled>
                            <?php break;
                        default:
 
                            switch ($name){
                                case "image":
                                case "thumbnail": ?>
                                    <img src="<?php echo $data->$name; ?>">
                                    <?php break;
                                case "lastProductsUpdate": ?>
                                    <?php echo date("d-m-Y", $data->$name); ?>
                                    <?php break;
                                default: ?>
                                    <?= h($data->$name) ?>
                                    <?php break;
                            }

                    } ?>
                </p>
            </div>
        <?php endforeach; ?>
        
       
    </div>
  
</div>

